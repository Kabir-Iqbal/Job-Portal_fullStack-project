import React from "react";
import Navbar from "./shared/navbar";
import Job from "./job";

const randomeJobs = [1, 2, 3, 4,5,6,7,8];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="text-xl font-bold my-10 "> Search Results ({randomeJobs.length})</div>
        <div className="grid grid-cols-3 gap-4">
          {randomeJobs.map((job, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
