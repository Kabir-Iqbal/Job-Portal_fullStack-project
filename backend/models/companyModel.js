import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
    },
    website:{
        type: String,
    },
    location:{
        type: String,
    },
    logo:{
        type: String,      // url to company logo
    },
   userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
   },
  
    
}, {timestamps: true})  //timestamps will add createdAt and updatedAt fields to the schema 


export default mongoose.model("Company", companySchema);