import mongoose from "mongoose";
import validator from "validator"

const schema=new mongoose.Schema(

    {
        _id:{
            type:String,
            required:[true,"Please enter ID"],
        },
        name:{
            type:String,
            required:[true,"Please Add name"],
        },
        email:{
            type:String,
            unique:[true,"email already exists"],
            required:[true,"Please enter email"],
            vaildate :validator.default.isEmail,

        },
        photo:{
            type:String,
            required:[true,"Please add Photo"]
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user",

        },
        gender:{
            type:String,
            enum:["male","female"],
            required:[true,"Please enter your gender"]

        },
        dob:{
            type:Date,
            required:[true,"Please enter date of birth"],
        }
    },{
        timestamps:true,
    }

);

schema.virtual("age").get(function(){
    const today=new Date();
    const dob=this.dob;
    let age=today.getFullYear()-dob.getFullYear();
    let monthDiff=today.getMonth()-dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
})

export const User=mongoose.model("User",schema);
