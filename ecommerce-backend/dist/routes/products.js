import express from "express";
import { singleUpload } from "../middlewares/multer.js";
export const Products = express.Router();
Products.post("/new", singleUpload);
export default Products;
