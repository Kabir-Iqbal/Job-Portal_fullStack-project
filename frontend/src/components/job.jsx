import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
  const navigate = useNavigate();

  // const jobId = "aksnnibdsububb";

  const daysAgoFunction=(mongoDbTime)=>{
      const createdAt = new Date(mongoDbTime);
      const currentTime = new Date()
      const timeDefference = currentTime - createdAt
      return Math.floor(timeDefference/(1000*24*60*60));
  }


  return (
    <div className="p-5 shadow-xl rounded-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm"> {daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          {" "}
          <Bookmark />{" "}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company?.name} </h1>
          <p className="text-gray-500 text-sm">{job.company?.location} </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title} </h1>
        <p className="text-gray-600 text-sm">
          {job?.description}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-700 font-bold " variant="ghost">{job?.position} </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}</Badge>
        </div>
        <div className="flex gap-2 items-center mt-4">
            <Button onClick={()=> navigate(`/description/${job._id}`)} variant="outline" className="rounded-full cursor-pointer">Details</Button>
            <Button variant="outline" className="rounded-full bg-[#7209b7] text-white cursor-pointer ">Save for later</Button>
        </div>
    </div>
  );
};

export default Job;
