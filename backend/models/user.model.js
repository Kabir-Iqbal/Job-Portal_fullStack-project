import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type : String,
        required: true,
        unique: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        default: "student",
        required: true,
    },
    profile:{
        bio: {type: String,},
       skills:[{type: String}],
       resume: {type: String, },     // url to resume file
       resumeOriginalName: {type: String,},
       company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},   
       profilePicture: {
        type: String, 
        default: ""
       },
      
       
    }
}, {timestamps: true})    //timestamps will add createdAt and updatedAt fields to the schema 


export default mongoose.model("User", userSchema);
