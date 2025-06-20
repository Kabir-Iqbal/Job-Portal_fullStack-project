import express from "express";
import { registerCompnay, getCompany, getCompanyById, updateCompany } from "../controllers/companyController.js";
import auth from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();


router.route("/register").post(auth , registerCompnay);
router.route("/get").get(auth , getCompany);
router.route("/get/:id").get(auth , getCompanyById);
router.route("/update/:id").put(auth,singleUpload, updateCompany);



export default router;