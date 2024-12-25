import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
export const authentication = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id)
            return next(new ErrorHandler("Id doesnt exist", 404));
        const user = await User.findById(id);
        if (!user)
            return next(new ErrorHandler("User doesnt exist", 405));
        if (user.role !== "admin")
            return next(new ErrorHandler("Role not allowed", 500));
        next();
    }
    catch (error) {
        next(new ErrorHandler(error, 504));
    }
};
