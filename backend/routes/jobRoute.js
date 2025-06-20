import express from "express";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../controllers/jobController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.route("/post").post(auth, postJob);
router.route("/get").get(auth, getAllJobs);
router.route("/getAdminJobs").get(auth, getAdminJobs);
router.route("/get/:id").get(auth, getJobById);




export default router;