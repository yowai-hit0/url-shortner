// import mongoose from "mongoose"

// const connectDb = async () =>{
//     try {
//         const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
//         console.log("connected to database ", connect.connection.host, connect.connection.name)
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
     
// }
// export default connectDb

import { connect } from "http2";
import mongoose from "mongoose";

// Replace with your MongoDB URI
const mongoURI = 'mongodb://127.0.0.1:27017/urls-store'; 

const connectDb = async ()=> await mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default connectDb