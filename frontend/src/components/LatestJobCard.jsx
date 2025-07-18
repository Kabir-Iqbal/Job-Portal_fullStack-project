import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <>
      <div onClick={()=> navigate(`/description/${job._id}`)} className="p-5 shadow-xl rounded-md bg-white border border-gray-100 cursor-pointer">
        <div>
          <h1 className="font-medium text-lg">{job?.compan}</h1>
          <p className="text-gray-500 text-sm" >{job?.location} </p>
        </div>
        <div>
          <h1 className="font-medium text-lg my-2" >{job?.title}</h1>
          <p className="text-gray-600 text-sm">
            {job?.description}
          </p>
        </div>
        <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-700 font-bold " variant="ghost">{job?.position}</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}</Badge>
        </div>
      </div>
    </>
  );
};

export default LatestJobCard;
