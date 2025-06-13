import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


const Job = () => {
  const navigate = useNavigate();

  const jobId = "aksnnibdsububb";

  return (
    <div className="p-5 shadow-xl rounded-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          {" "}
          <Bookmark />{" "}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-gray-500 text-sm">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-700 font-bold " variant="ghost">12 Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">24L-30L</Badge>
        </div>
        <div className="flex gap-2 items-center mt-4">
            <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline" className="rounded-full cursor-pointer">Details</Button>
            <Button variant="outline" className="rounded-full bg-[#7209b7] text-white cursor-pointer ">Save for later</Button>
        </div>
    </div>
  );
};

export default Job;
