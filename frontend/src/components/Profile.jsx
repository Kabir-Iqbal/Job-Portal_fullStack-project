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

    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    console.log("user", user);

    // check if skills are availbe
    const skills = user?.profile?.skills || [];

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-md p-8 my-5">
        <div className="flex justify-between ">
          <div className="flex items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage
                alt="profile"
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant={"outline"} className="text-right cursor-pointer">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Phone />
            <span>{user?.phonenumber}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <MapPin />
            <span>Pakistan</span>
          </div>
          <div className=" my-5">
            <h1 className="text-lg font-bold">Skills</h1>
            <div className="flex items-center gap-1">
              {skills.length === 0 ? (
                <p className="text-gray-500">NA</p>
              ) : (
                skills.map((item, index) => (
                  <div key={index} className="bg-gray-200 rounded-md p-2">
                    <Badge variant={"outline"} className="cursor-pointer">
                      {item}
                    </Badge>
                  </div>
                ))
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label className="text-md font-bold mt-5">{user?.profile?.resume ? "Resume" : "No Resume"}</Label>
                {
                    isResume ? <a href={user?.profile?.resume} target="_blank" className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName} </a> : <p>NA</p>
                }
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                {/* Application table */}
                <AppliedJobTable />

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
