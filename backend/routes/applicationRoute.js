import express from "express";
import { applyJob, getAppliedJobs, getApplications, updateStatus } from "../controllers/applicationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.route("/apply/:id").get(auth , applyJob);
router.route("/get").get(auth , getAppliedJobs);
router.route("/:id/applicants").get(auth , getApplications);
router.route("/status/:id/update").put(auth , updateStatus);



export default router;