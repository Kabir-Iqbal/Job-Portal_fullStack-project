// import React, { useEffect, useState } from "react";
// import Navbar from "./shared/navbar";
// import FilterCard from "./FilterCard";
// import Job from "./job";
// import { useSelector } from "react-redux";
// import { motion } from 'framer-motion';

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector(state => state.job);
//   const [filterJobs, setFilterJobs] = useState(allJobs);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                job.location.toLowerCase().includes(searchedQuery.toLowerCase());
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-[90%] sm:max-w-5xl lg:max-w-7xl mx-auto mt-4 sm:mt-5 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
//           <div className="w-full lg:w-[20%]">
//             {/* Filter page */}
//             <FilterCard />
//           </div>

//           {filterJobs.length === 0 ? (
//             <div className="text-center text-lg sm:text-xl lg:text-2xl font-bold my-8 sm:my-10">
//               No jobs found
//             </div>
//           ) : (
//             <div className="flex-1 h-[70vh] xxs:h-[75vh] sm:h-[80vh] overflow-y-auto pb-4 sm:pb-5">
//               <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {filterJobs.map((jobs) => (
//                   <motion.div
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 100 }}
//                     transition={{ duration: 0.3 }}
//                     key={jobs._id}
//                   >
//                     <Job job={jobs} />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;


import React, { useEffect, useState } from "react";
import Navbar from "./shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(state => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job.location.toLowerCase().includes(searchedQuery.toLowerCase());
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div>
    <Navbar />
    <div className="max-w-[90%] sm:max-w-5xl lg:max-w-7xl mx-auto mt-4 sm:mt-5 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
        <Button 
          onClick={toggleFilter} 
          className="md:hidden mb-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-sm sm:text-base px-4 sm:px-6"
        >
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {isFilterOpen ? "Close Filters" : "Open Filters"}
        </Button>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: isFilterOpen || window.innerWidth >= 768 ? 0 : "-100%", opacity: isFilterOpen || window.innerWidth >= 768 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-[20%] fixed md:static top-0 left-0 h-full md:h-auto bg-white md:bg-transparent z-50 md:z-0 min-w-[200px] md:block"
        >
          <FilterCard onClose={() => setIsFilterOpen(false)} />
        </motion.div>
        {filterJobs.length === 0 ? (
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-bold my-8 sm:my-10">
            No jobs found
          </div>
        ) : (
          <div className="flex-1 h-[70vh] xxs:h-[75vh] sm:h-[80vh] overflow-y-auto pb-4 sm:pb-5">
            <div className="grid grid-cols-1 mx-auto px-auto sm:grid-cols-2 xxs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filterJobs.map((jobs) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                  key={jobs._id}
                >
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