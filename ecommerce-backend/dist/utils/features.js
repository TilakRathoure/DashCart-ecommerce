import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/", {
        dbName: "Ecommerce_25"
    }).then((c) => console.log(`Db Connected to ${c.connection.host}`)).catch((e) => { console.log(e); });
};
