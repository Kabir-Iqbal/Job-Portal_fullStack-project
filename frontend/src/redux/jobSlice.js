import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs :  [],
        singleJob : null
    }, 
    reducers : {
        // action
        SetAllJobs : (state, action)=> {
            state.allJobs = action.payload
        },
        SetSingleJob : (state, action)=>{
           state.singleJob = action.payload
        }
    }
})


export const {SetAllJobs, SetSingleJob} = jobSlice.actions;    // for add jobs in intitail state
export default jobSlice.reducer                 // for get all jobs from state thorugh reducer