import { Request, Response, NextFunction } from "express";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import {
    BaseQuery,
    NewProductRequestBody,
    SearchRequestQuery,
  } from "../types/types.js";
import {
  deleteFromCloudinary,
  findAverageRatings,
  invalidateCache,
  uploadToCloudinary,
} from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const getLatestProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let products = await redis.get("latest-products");

    if (products) {
      products = JSON.parse(products);
    } else {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
      await redis.setex("latest-products", redisTTL, JSON.stringify(products));
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    next(new ErrorHandler("Error fetching latest products", 500));
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let categories = await redis.get("categories");

    if (categories) {
      categories = JSON.parse(categories);
    } else {
      categories = await Product.distinct("category");
      await redis.setex("categories", redisTTL, JSON.stringify(categories));
    }

    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(new ErrorHandler("Error fetching categories", 500));
  }
};

export const getAdminProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let products = await redis.get("all-products");

    if (products) {
      products = JSON.parse(products);
    } else {
      products = await Product.find({});
      await redis.setex("all-products", redisTTL, JSON.stringify(products));
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    next(new ErrorHandler("Error fetching admin products", 500));
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const key = `product-${id}`;
    let product = await redis.get(key);

    if (product) {
      product = JSON.parse(product);
    } else {
      product = await Product.findById(id);
      if (!product) return next(new ErrorHandler("Product not found", 404));
      await redis.setex(key, redisTTL, JSON.stringify(product));
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(new ErrorHandler("Error fetching product", 500));
  }
};

export const newProduct = async (
  req: Request<{}, {}, any>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, stock, category, description } = req.body;
    const photos = req.files as Express.Multer.File[] | undefined;

    if (!photos || photos.length < 1) {
      return next(new ErrorHandler("Please upload at least one photo", 400));
    }

    if (photos.length > 5) {
      return next(new ErrorHandler("You can only upload up to 5 photos", 400));
    }

    if (!name || !price || !stock || !category || !description) {
      return next(new ErrorHandler("Please fill all required fields", 400));
    }

    const photosURL = await uploadToCloudinary(photos);

    await Product.create({
      name,
      price,
      description,
      stock,
      category: category.toLowerCase(),
      photos: photosURL,
    });

    await invalidateCache({ product: true, admin: true });

    res.status(201).json({ success: true, message: "Product created successfully" });
  } catch (error) {
    next(new ErrorHandler("Error creating product", 500));
  }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, price, stock, category, description } = req.body;
      const photos = req.files as Express.Multer.File[] | undefined;
  
      const product = await Product.findById(id);
  
      if (!product) return next(new ErrorHandler("Product not found", 404));
  
      if (photos && photos.length > 0) {
        const photosURL = await uploadToCloudinary(photos);
  
        const ids = product.photos.map((photo) => photo.public_id);
        await deleteFromCloudinary(ids);
  
        product.photos = photosURL;
      }
  
      if (name) product.name = name;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      if (category) product.category = category;
      if (description) product.description = description;
  
      await product.save();
  
      await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });
  
      res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
      next(new ErrorHandler("Error updating product", 500));
    }
  };
  
  export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) return next(new ErrorHandler("Product not found", 404));
  
      const ids = product.photos.map((photo) => photo.public_id);
      await deleteFromCloudinary(ids);
  
      await product.deleteOne();
  
      await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });
  
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      next(new ErrorHandler("Error deleting product", 500));
    }
  };
  
  export const getAllProducts = async (
    req: Request<{}, {}, {}, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { search, sort, category, price } = req.query;
      const page = Number(req.query.page) || 1;
      const key = `products-${search}-${sort}-${category}-${price}-${page}`;
  
      let products;
      let totalPage;
  
      const cachedData = await redis.get(key);
      if (cachedData) {
        const data = JSON.parse(cachedData);
        products = data.products;
        totalPage = data.totalPage;
      } else {
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;
  
        const baseQuery: any = {};
        if (search)
          baseQuery.name = {
            $regex: search,
            $options: "i",
          };
  
        if (price)
          baseQuery.price = {
            $lte: Number(price),
          };
  
        if (category) baseQuery.category = category;
  
        const [productsFetched, filteredOnlyProduct] = await Promise.all([
          Product.find(baseQuery)
            .sort(sort && { price: sort === "asc" ? 1 : -1 })
            .limit(limit)
            .skip(skip),
          Product.find(baseQuery),
        ]);
  
        products = productsFetched;
        totalPage = Math.ceil(filteredOnlyProduct.length / limit);
  
        await redis.setex(key, 30, JSON.stringify({ products, totalPage }));
      }
  
      res.status(200).json({ success: true, products, totalPage });
    } catch (error) {
      next(new ErrorHandler("Error fetching products", 500));
    }
  };
  
  export const allReviewsOfProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const key = `reviews-${req.params.id}`;
      let reviews = await redis.get(key);
  
      if (reviews) {
        reviews = JSON.parse(reviews);
      } else {
        reviews = await Review.find({ product: req.params.id })
          .populate("user", "name photo")
          .sort({ updatedAt: -1 });
  
        await redis.setex(key, redisTTL, JSON.stringify(reviews));
      }
  
      res.status(200).json({ success: true, reviews });
    } catch (error) {
      next(new ErrorHandler("Error fetching reviews", 500));
    }
  };
  
  export const newReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findById(req.query.id);
      if (!user) return next(new ErrorHandler("Not logged in", 404));
  
      const product = await Product.findById(req.params.id);
      if (!product) return next(new ErrorHandler("Product not found", 404));
  
      const { comment, rating } = req.body;
  
      const alreadyReviewed = await Review.findOne({
        user: user._id,
        product: product._id,
      });
  
      if (alreadyReviewed) {
        alreadyReviewed.comment = comment;
        alreadyReviewed.rating = rating;
  
        await alreadyReviewed.save();
      } else {
        await Review.create({
          comment,
          rating,
          user: user._id,
          product: product._id,
        });
      }
  
      const { ratings, numOfReviews } = await findAverageRatings(product._id);
  
      product.ratings = ratings;
      product.numOfReviews = numOfReviews;
  
      await product.save();
  
      await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
        review: true,
      });
  
      res.status(alreadyReviewed ? 200 : 201).json({
        success: true,
        message: alreadyReviewed ? "Review updated" : "Review added",
      });
    } catch (error) {
      next(new ErrorHandler("Error adding/updating review", 500));
    }
  };
  
  export const deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findById(req.query.id);
      if (!user) return next(new ErrorHandler("Not logged in", 404));
  
      const review = await Review.findById(req.params.id);
      if (!review) return next(new ErrorHandler("Review not found", 404));
  
      const isAuthenticUser = review.user.toString() === user._id.toString();
      if (!isAuthenticUser) return next(new ErrorHandler("Not authorized", 401));
  
      await review.deleteOne();
  
      const product = await Product.findById(review.product);
      if (!product) return next(new ErrorHandler("Product not found", 404));
  
      const { ratings, numOfReviews } = await findAverageRatings(product._id);
  
      product.ratings = ratings;
      product.numOfReviews = numOfReviews;
  
      await product.save();
  
      await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });
  
      res.status(200).json({ success: true, message: "Review deleted" });
    } catch (error) {
      next(new ErrorHandler("Error deleting review", 500));
    }
  };
  