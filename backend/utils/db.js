// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();


// const connectDB = async () => {
//     try{
//         console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debug
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("Connected to MongoDB");
//     }catch(error){
//         console.log("Error connecting to MongoDB", error);
//     }
// }

// export default connectDB;




import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
