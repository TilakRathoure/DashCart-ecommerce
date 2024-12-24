import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";


export const newUser=async(req:Request<{},{},NewUserRequestBody>,res:Response,next:NextFunction):Promise<any>=>{

    try{

        const {name,email,photo,gender,_id,dob}=req.body;

        let user= await User.findById(_id);

        if(user){

            return res.status(200).json({
                success:true,
                message:`Welcome ${user.name}`
            })
        }

        if(!_id || !name || !email || !photo || !gender || !dob){
            return next(new ErrorHandler("Please add all fields",400))


        }

        user=await User.create({
            name,
            email,
            photo,
            gender,
            _id,
            dob:new Date(dob)
        })

        return res.status(200).json({
            success:true,
            message:`Welcome ${user.name}` 

        })


    }catch(error){

        next(new ErrorHandler(error,403))

    }


}

export const getAllUsers=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try{

        const users=await User.find({});

        return res.status(200).json({
            message:"success",
            data:users
        })


    }catch(error){
        next(new ErrorHandler("error fetching data",404))
    }


}

export const deleteUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try{

        const {id}=req.params;
        const user=await User.findById(id);

        if(!user){
            next(new ErrorHandler("user not found",404))
        }

        await User.deleteOne({_id:id})

        return res.status(200).json({
            message:"successfully deleted",
        })

    }catch(error){

        next(new ErrorHandler("unknown error",404))

    }

}

export const getUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try{

        const {id}=req.params;

        if(!id) return next(new ErrorHandler("bad request",505));

        const user=User.findById(id);

        if(!user) return next(new ErrorHandler("user doesnt exist",404));

        return res.status(202).json({
            message:"success",
            data:user
        })


    }catch(error){
        next(new ErrorHandler(error,404));
    }


}