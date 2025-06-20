import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    password: {
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
       profilePhoto: {
        type: String, 
        default: ""
       },
      
       
    }
}, {timestamps: true})    //timestamps will add createdAt and updatedAt fields to the schema 


export default mongoose.model("User", userSchema);
