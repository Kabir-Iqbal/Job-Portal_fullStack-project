import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongoDbTime) => {
      const createdAt = new Date(mongoDbTime);
      const currentTime = new Date();
      const timeDifference = currentTime - createdAt;
      return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <div className=" max-w-[400px] mx-auto h-[300px] flex flex-col p-4 xs:p-5 sm:p-6 shadow-xl rounded-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-xs xs:text-sm">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full w-8 h-8 xs:w-9 xs:h-9" size="icon">
          <Bookmark className="w-4 h-4 xs:w-5 xs:h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-1 xs:my-2">
        <Button variant="outline" className="p-4 xs:p-5 sm:p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-base xs:text-lg sm:text-xl">{job?.company?.name}</h1>
          <p className="text-gray-500 text-xs xs:text-sm">{job?.company?.location}</p>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-base xs:text-lg sm:text-xl my-1 xs:my-2">{job?.title}</h1>
        <p className="text-gray-600 text-xs xs:text-sm line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap gap-1 mb-1 xs:gap-2 items-center mt-3 xs:mt-4">
        <Badge className="text-blue-700 font-bold text-xs xs:text-sm" variant="ghost">{job?.position}</Badge>
        <Badge className="text-[#F83002] font-bold text-xs xs:text-sm" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold text-xs xs:text-sm" variant="ghost">{job?.salary}</Badge>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-auto xs:mt-4">
        <Button 
          onClick={() => navigate(`/description/${job._id}`)} 
          variant="outline" 
          className="rounded-full text-xs xs:text-sm px-3 xs:px-4"
        >
          Details
        </Button>
        <Button 
          variant="outline" 
          className="rounded-full bg-[#7209b7] text-white text-xs xs:text-sm px-3 xs:px-4"
        >
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;