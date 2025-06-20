import Application from "../models/applicationModel.js";
import Job from "../models/jobsModel.js";


// User can apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        

        if(!jobId ){
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });     
        }

        //   check if the job is already applied
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false,
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message: "Job not found",
                success: false,
            });
        }

        // create a new application
        const application = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(application._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application,
        });

            
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}


// get Applied Jobs
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: "job",
            options: {sort : {reatedAt: -1},
            populate: {
                path: "company",
            },
        }});

        if(!applications){
            return res.status(400).json({
                message: "No applications found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Applied jobs fetched successfully",
            success: true,
            applications,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}



// Admin can see all applications
export const getApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }

        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
                path: "applicant",
            },
            options: {sort: {createdAt: -1}},
        });

        if(!job){
            return res.status(400).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "job fetched successfully",
            success: true,
            job,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}



// update application status
export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!applicationId){
            return res.status(400).json({
                message: "Application ID is required",
                success: false,
            });
        }

        // find the application by applicantId 
        const application = await Application.findOne({_id : applicationId});

        if(!application){
            return res.status(400).json({
                message: "Application not found",
                success: false,
            });
        }

        // check if the application is already updated
        if(application.status !== "pending"){
            return res.status(400).json({
                message: "Application already updated",
                success: false,
            });
        }
        
        // update the status
        application.status = status;
        await application.save();


        return res.status(200).json({
            message: "Application status updated successfully",
            success: true,
            application,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
        
    }
}