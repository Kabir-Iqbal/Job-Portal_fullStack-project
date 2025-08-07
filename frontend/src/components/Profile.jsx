import React from "react";
import Navbar from "./shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./updateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";


const skills = [
  "React",
  "Node",
  "MongoDB",
  "Express",
  "Tailwind",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
];

const Profile = () => {

    const isResume = true;

    useGetAppliedJobs()


    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
   // console.log("user", user);

    // check if skills are availbe
    const skills = user?.profile?.skills || [];

  return (
    
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex  flex-row justify-between   sm:gap-4">
              <div className="flex gap-1 sm:gap-4 items-center">
                <Avatar className="h-12 w-12 sm:h-20 sm:w-20">
                  <AvatarImage
                    alt="profile"
                    src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  />
                </Avatar>
                <div>
                  <h1 className="font-semibold text-xl">{user?.fullname}</h1>
                  <p className="text-gray-600">{user?.profile?.bio}</p>
                </div>
              </div>
              <Button onClick={() => setOpen(true)} variant={"outline"} className="self-center">
                <Pen className="sm:w-4 w-3 h-3 sm:h-4 mr-1 sm:mr-2" />
                Edit
              </Button>
            </div>
  
            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>{user?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>{user?.phonenumber || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>{user?.profile?.location || "N/A"}</span>
              </div>
            </div>
  
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <p className="text-gray-500">N/A</p>
                ) : (
                  skills.map((item, index) => (
                    <Badge key={index} variant={"outline"}>
                      {item}
                    </Badge>
                  ))
                )}
              </div>
            </div>
  
            <div className="mt-6">
              <Label className="text-md font-bold">Resume</Label>
              {isResume && user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block mt-1"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <p className="text-gray-500 mt-1">N/A</p>
              )}
            </div>
          </div>
  
          <div className="bg-white shadow-md rounded-xl p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
            <div className="overflow-x-auto">
              <AppliedJobTable />
            </div>
          </div>
        </div>
  
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
  );
};

export default Profile;
