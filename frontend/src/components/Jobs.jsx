import React, { useEffect, useState } from "react";
import Navbar from "./shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import {motion} from 'framer-motion';

//const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {

  const {allJobs,searchedQuery} = useSelector(state=> state.job)
  const [filterJobs,setFilterJobs] = useState(allJobs)

  useEffect(()=>{
       if(searchedQuery){
        const filteredJobs = allJobs.filter((job)=>{
          return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 

        })
        setFilterJobs(filteredJobs)
       }else{
        setFilterJobs(allJobs)
       }
  },[allJobs,searchedQuery])

  return (
    <div>
      <Navbar />
      {/* Filter page */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {filterJobs.length === 0 ? (
            <div className="text-center text-2xl font-bold">No jobs found</div>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((jobs) => (
                  
                  <motion.div
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:100}}
                  transition={{duration:0.3}}
                   key={jobs._id}>
                    <Job job={jobs} />
                  </motion.div>
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
