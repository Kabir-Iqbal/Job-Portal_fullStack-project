import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];


const LatestJobs = () => {

  const {allJobs} = useSelector(state => state.job)
  console.log("jobs", allJobs);
  

  return (
    <div className="my-12 sm:my-16 lg:my-20 max-w-[90%] sm:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-5">
        {/* Cards */}
        {allJobs.length === 0 ? <span className="col-span-full text-center">No available job</span> : allJobs.slice(0,6).map((job, index) => (
          <LatestJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
