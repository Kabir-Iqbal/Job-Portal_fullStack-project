import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];


const LatestJobs = () => {

  const {allJobs} = useSelector(state => state.job)
  console.log("jobs", allJobs);
  

  return (
    <div className="my-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">
        {" "}
        <span className=" text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {/* Cards */}
        {allJobs.length === 0 ? <span>No availble job</span> :  allJobs.slice(0,6).map((job, index) => (
          <LatestJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
