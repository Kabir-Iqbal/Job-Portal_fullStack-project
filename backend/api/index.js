// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import connectDB from "../utils/db.js";
// import userRoutes from "../routes/userRoute.js";
// import companyRoutes from "../routes/companyRoute.js";
// import jobRoutes from "../routes/jobRoute.js";
// import applicationRoutes from "../routes/applicationRoute.js";

// dotenv.config();

// const app = express();

// // midlleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // cors is used to allow the frontend to access the backend
// const corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
// };

// app.use(cors(corsOptions));




// // routes
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/company", companyRoutes);
// app.use("/api/v1/job", jobRoutes);
// app.use("/api/v1/application", applicationRoutes);


// app.get("/home",(req,res)=> {
//     return res.json({
//         message : "Iam coming from backend",
//         success : true,
//     })
// })


// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     connectDB();
//     console.log(`Server is running on port ${port}`);
// });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "../utils/db.js";
import userRoutes from "../routes/userRoute.js";
import companyRoutes from "../routes/companyRoute.js";
import jobRoutes from "../routes/jobRoute.js";
import applicationRoutes from "../routes/applicationRoute.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors
const corsOptions = {
  origin: "https://jobportal.vercel.app", // ✅ Vercel pe frontend ka exact domain daalna (example: https://your-frontend.vercel.app)
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.get("/home", (req, res) => {
  return res.json({
    message: "I am coming from backend 🚀",
    success: true,
  });
});

// ✅ Database connect (only once)
connectDB();

// ✅ Export app instead of listen
export default app;
