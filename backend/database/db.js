import mongoose from "mongoose";
import dotenv from "dotenv";
const Connection=()=>{
    dotenv.config();
    const URL=process.env.MONGODB_URL;
    mongoose.connect(URL).then(()=>{
        console.log("Database connected!!");

    }).catch((err)=>{
        console.log("Error while connecting with database",err.message);
    });


}

export default Connection;