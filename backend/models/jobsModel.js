import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    requirements:[{
        type: String,
        
    }],
    salary:{
        type: Number,
        required: true,
    },
    experience:{
        type: Number,
        required: true,
    },
   location:{
    type: String,
    required: true,
   },

   jobType:{
    type: String,
    required: true,
   },
   position:{
    type: String,
    required: true,
   },
   company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
   },
   createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   applications:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
   }]

}, {timestamps: true})  //timestamps will add createdAt and updatedAt fields to the schema 


export default mongoose.model("Job", jobSchema);