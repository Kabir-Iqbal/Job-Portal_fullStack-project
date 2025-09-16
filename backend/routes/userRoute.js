import express from "express";
import { register, login, logout, updateProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
      message: "You are on User page 🚀",
      success: true,
    });
  });

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(auth ,singleUpload, updateProfile);



export default router;