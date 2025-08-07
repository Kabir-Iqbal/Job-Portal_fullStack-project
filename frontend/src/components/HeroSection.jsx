import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { SetsearchedQuerry } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const[query , setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchHandler = ()=>{
    dispatch(SetsearchedQuerry(query))
    navigate('/browse')
  }


  return (
    <div className="text-center">
      <div className="flex flex-col gap-4 sm:gap-5 my-6 sm:my-8 lg:my-10">
        <span className="px-3 py-1 sm:px-4 sm:py-2 mx-auto rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
          Find the best job that fits your skills and needs
        </p>
        <div className="flex  w-[90%] sm:w-[70%] lg:w-[40%] shadow-lg border border-gray-200 rounded-full mx-auto gap-2 sm:gap-4 items-center pl-2 sm:pl-3">
          <Input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm sm:text-base"
          />
          <Button
            onClick={searchHandler}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] py-1 sm:py-2 px-3 sm:px-4 text-white rounded-r-full"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
