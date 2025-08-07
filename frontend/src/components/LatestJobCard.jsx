import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <>
      <div 
        onClick={() => navigate(`/description/${job._id}`)} 
        className="p-4 xs:p-5 sm:p-6 shadow-xl rounded-md bg-white border border-gray-100 cursor-pointer"
      >
        <div>
          <h1 className="font-medium text-base xs:text-lg sm:text-xl">{job?.company?.name}</h1>
          <p className="text-gray-500 text-xs xs:text-sm">{job?.location}</p>
        </div>
        <div>
          <h1 className="font-medium text-base xs:text-lg sm:text-xl my-1 xs:my-2">{job?.title}</h1>
          <p className="text-gray-600 text-xs xs:text-sm line-clamp-3">{job?.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 xs:gap-2 items-center mt-3 xs:mt-4">
          <Badge className="text-blue-700 font-bold text-xs xs:text-sm" variant="ghost">{job?.position}</Badge>
          <Badge className="text-[#F83002] font-bold text-xs xs:text-sm" variant="ghost">{job?.jobType}</Badge>
          <Badge className="text-[#7209b7] font-bold text-xs xs:text-sm" variant="ghost">{job?.salary}</Badge>
        </div>
      </div>
    </>
  );
};

export default LatestJobCard;