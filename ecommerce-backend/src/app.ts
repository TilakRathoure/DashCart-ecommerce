import express from "express";

import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

const app=express();
const port=4000;

connectDB(); 
app.use(express.json())
app.use(errorMiddleware);

app.use("/api/v1/user",userRoute);
app.use("/api/v1/product,",productRoute);

app.get("/",(req,res)=>{

    res.send("Api working"); 

})




app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`);
})
