import Company from "../models/companyModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/Cloudinary.js";

// register company
export const registerCompnay = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;


        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        // Check if company already exists
        const existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register same company ",
                success: false,
            });
        }

        // Create new company
        const company = await Company.create({
            name: companyName,
            userId: req.id,
            description: description || "",  // default if not provided
            website: website || "",
            location: location || "",
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });

    }
}


// get company
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: "No company found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Companies fetched successfully",
            success: true,
            companies,
        });

    } catch (error) {

    }
}


// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error.message);

    }
}



// update company
export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body

        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        };

     

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "File is required",
                success: false,
            });
        }
        // here cloudinary
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url

        const updateData = { name, description, website, location, logo };

        


        //   find and update
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company,
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message, // Optional: helpful for debugging
        });

    }
}