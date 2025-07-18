import React, { useEffect } from "react";
import Navbar from "./shared/navbar";
import Job from "./job";
import { useDispatch, useSelector } from "react-redux";
import { SetsearchedQuerry } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

const randomeJobs = [1, 2, 3, 4,5,6,7,8];

const Browse = () => {
  useGetAllJobs();
  const {allJobs}= useSelector(store=>store.job);
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
        dispatch(SetsearchedQuerry(""));
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="text-xl font-bold my-10 "> Search Results ({allJobs.length || "N/A"})</div>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job, index) => {
            return <Job key={index} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
