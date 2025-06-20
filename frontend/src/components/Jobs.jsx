import React from "react";
import Navbar from "./shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {

  const {allJobs} = useSelector(state=> state.job)

  return (
    <div>
      <Navbar />
      {/* Filter page */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {allJobs.length === 0 ? (
            <div className="text-center text-2xl font-bold">No jobs found</div>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((jobs) => (
                  <div key={jobs._id}>
                    <Job job={jobs} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
