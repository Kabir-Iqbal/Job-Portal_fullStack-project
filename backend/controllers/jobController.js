import Job from "../models/jobsModel.js";

//Admin will post job
export const postJob = async (req, res) => {
     try {
        const {title, description, location, salary,jobType, requirements, experience,position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !location || !salary || !jobType || !requirements || !experience || !position || !companyId){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        
        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            location,
            salary : Number(salary),
            jobType,
            experience,
            position,
            company: companyId,
            createdBy: userId,
        });
        return res.status(201).json({
            message: " New Job created successfully",
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



// Student
// get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
               
            ],
        };

        const jobs = await Job.find(query).populate({       //populate is used to get the company name from the companyId
            path: "company",
        }).sort({createdAt: -1});             //sort is used to sort the jobs by createdAt in descending order

        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "All jobs fetched successfully",
            success: true,
            jobs,
        });
    


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

// student
// get job by id
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications"
        });
        if(!job){
            return res.status(404).json({
                message: "job not found",
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




// Admin how many jobs are created by him
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy: adminId});
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "jobs fetched successfully",
            success: true,
            jobs,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}