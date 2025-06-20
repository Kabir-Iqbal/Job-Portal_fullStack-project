import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 mx-auto rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]"> Dream Jobs </span>{" "}
        </h1>
        <p className="text-gray-500">
          Find the best job that fits your skills and needs
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-full mx-auto gap-4 items-center pl-3">
          <Input type="text" placeholder="Find your dream job" className="outline-none border-none w-full" />
          <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] py-2 px-4 text-white  rounded-r-full">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
