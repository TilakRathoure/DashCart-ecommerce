import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/utility-class.js";


export const errorMiddleware=(err:ErrorHandler,req:Request,res:Response,next:NextFunction)=>{

    err.message= err.message|| "Internal Server Error";
    err.statusCode= err.statusCode || 500

     res.status(err.statusCode).json({
        success:false,
        message:err.message
     })
};