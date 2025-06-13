import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
    const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto my-10">
    <div className="flex items-center justify-between">
        <div>

        
      <h1 className="text-xl font-bold">Frontend Developer</h1>
      <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-700 font-bold " variant="ghost"> 12 Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">24L-30L</Badge>
          </div>
       
          </div>
          <div>
            <Button disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed text-white" : "bg-[#7209b7] hover:bg-[#5f32ad] text-white cursor-pointer"}`}>
                {
                    isApplied ? "Already Applied" : "Apply Now"
                }
            </Button>
          </div>
      </div>
      <h1 className="border-b-2 border-b-gray-200 font-medium py-4 ">Job Description</h1>
      <div className="my-4">
          <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
          <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Hyderabad</span></h1>
          <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span></h1>
          <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 years</span></h1>
          <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12L-18L</span></h1>
          <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">5</span></h1>
          <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">13-06-2025</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
