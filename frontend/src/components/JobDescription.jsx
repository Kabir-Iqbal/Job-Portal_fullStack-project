// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import { SetSingleJob } from "../redux/jobSlice";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";


// const JobDescription = () => {

//   const { user } = useSelector(state => state.auth);
//   const { singleJob } = useSelector(state => state.job)

//   const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user._id) || false;
//   const [isApplied, setApplied] = useState(isInitialApplied)


//   const params = useParams();
//   const jobId = params.id;

 
//   const dispatch = useDispatch()


//   const applyJobHandler = async()=>{
//     try {
//       const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials: true})

//       console.log("response applied",res)
//       if (res.data.success) {
//         setApplied(true)    // update to the local state
//         const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
//         dispatch(SetSingleJob(updateSingleJob))   // helps to realtime ui update
//         toast.success(res.data.message)
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   }


//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {

//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true
//         });

//         // console.log("Single job", res );
//         // console.log("Single job fromstore", singleJob);
        
  
//         if (res.data.success) {
//           dispatch(SetSingleJob(res.data.job))
//           setApplied(res.data.job.applications.some(application=> application.applicant === user?._id))   // ensure that state is sync with fetched data
//         }

//       } catch (error) {
//         console.log(error)
//       }

//     }
//     fetchSingleJob()

//   }, [jobId, dispatch, user._id])


//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <div className="flex items-center justify-between">
//         <div>


//           <h1 className="text-xl font-bold">{singleJob?.title} </h1>
//           <div className="flex gap-2 items-center mt-4">
//             <Badge className="text-blue-700 font-bold " variant="ghost"> {singleJob?.position} </Badge>
//             <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType} </Badge>
//             <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} </Badge>
//           </div>

//         </div>
//         <div>
//           <Button onClick={applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed text-white" : "bg-[#7209b7] hover:bg-[#5f32ad] text-white cursor-pointer"}`}>
//             {
//               isApplied ? "Already Applied" : "Apply Now"
//             }
//           </Button>
//         </div>
//       </div>
//       <h1 className="border-b-2 border-b-gray-200 font-medium py-4 ">{singleJob?.description || "N/A"} </h1>
//       <div className="my-4">
//         <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title || "No role provided"}  </span></h1>
//         <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location || "N/A"} </span></h1>
//         <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description || "N/A"}</span></h1>
//         <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience || "N/A"} years</span></h1>
//         <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary || "N/A"} </span></h1>
//         <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length || "N/A"} </span></h1>
//         <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0] || "N/A"}</span></h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;


import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { SetSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { user } = useSelector(state => state.auth);
  const { singleJob } = useSelector(state => state.job);
  const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user._id) || false;
  const [isApplied, setApplied] = useState(isInitialApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(SetSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(SetSingleJob(res.data.job));
          setApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user._id]);

  return (
    <div className="max-w-[90%] xxs:max-w-[95%] sm:max-w-5xl lg:max-w-7xl mx-auto my-6 xxs:my-8 sm:my-10 p-4 xxs:p-5 xs:p-6 sm:p-8 bg-white rounded-md shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 xxs:gap-5">
        <div className="w-full">
          <h1 className="text-base xxs:text-lg xs:text-xl sm:text-2xl font-bold line-clamp-2">{singleJob?.title || "N/A"}</h1>
          <div className="flex flex-wrap gap-1 xxs:gap-2 items-center mt-2 xxs:mt-3 xs:mt-4">
            <Badge className="text-blue-700 font-bold text-[10px] xxs:text-xs xs:text-sm" variant="ghost">{singleJob?.position || "N/A"}</Badge>
            <Badge className="text-[#F83002] font-bold text-[10px] xxs:text-xs xs:text-sm" variant="ghost">{singleJob?.jobType || "N/A"}</Badge>
            <Badge className="text-[#7209b7] font-bold text-[10px] xxs:text-xs xs:text-sm" variant="ghost">{singleJob?.salary || "N/A"}</Badge>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`w-full sm:w-auto rounded-lg px-3 xxs:px-4 xs:px-5 text-[10px] xxs:text-xs xs:text-sm sm:text-base font-semibold ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed text-white"
                : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-200 font-medium text-sm xxs:text-base xs:text-lg sm:text-xl py-3 xxs:py-4 line-clamp-3">
        {singleJob?.description || "N/A"}
      </h1>
      <div className="my-3 xxs:my-4 xs:my-5 sm:my-6">
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Role: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.title || "N/A"}</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Location: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.location || "N/A"}</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Description: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm line-clamp-3">{singleJob?.description || "N/A"}</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Experience: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.experience || "N/A"} years</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Salary: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.salary || "N/A"}</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Total Applicants: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.applications?.length || "N/A"}</span>
        </h1>
        <h1 className="font-bold text-sm xxs:text-base xs:text-lg my-1 xxs:my-2">
          Posted Date: <span className="pl-2 xxs:pl-3 xs:pl-4 font-normal text-gray-800 text-[10px] xxs:text-xs xs:text-sm">{singleJob?.createdAt?.split("T")[0] || "N/A"}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;