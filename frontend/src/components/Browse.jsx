import React, { useEffect } from "react";
import Navbar from "./shared/navbar";
import Job from "./job";
import { useDispatch, useSelector } from "react-redux";
import { SetsearchedQuerry } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
        dispatch(SetsearchedQuerry(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className="max-w-[90%] sm:max-w-5xl lg:max-w-7xl mx-auto my-8 sm:my-10 lg:my-12 px-4 sm:px-6 lg:px-8">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold my-6 sm:my-8 lg:my-10">
          Search Results ({allJobs.length || "N/A"})
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allJobs.map((job, index) => {
            return <Job key={index} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;