import mongoose from "mongoose";
export const connectDB = (url) => {
    mongoose.connect(url, {
        dbName: "Ecommerce_25"
    }).then((c) => console.log(`Db Connected to ${c.connection.host}`)).catch((e) => { console.log(e); });
};
