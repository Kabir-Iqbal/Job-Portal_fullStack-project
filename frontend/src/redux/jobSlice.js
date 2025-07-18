import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs :  [],
        allAdminJobs: [],
        singleJob : null,
        searchJobByText : "",
        allAppliedJobs : [],
        searchedQuery : ''
    }, 
    reducers : {
        // action
        SetAllJobs : (state, action)=> {
            state.allJobs = action.payload
        },
        SetSingleJob : (state, action)=>{
           state.singleJob = action.payload
        },
        SetAllAdminJobs : (state, action)=> {
            state.allAdminJobs = action.payload
        },
        SetSearchJobByText : (state, action)=> {
            state.searchJobByText = action.payload
        },
        SetAllAppliedJobs : (state,action)=>{
            state.allAppliedJobs = action.payload
        },
        SetsearchedQuerry :(state,action)=>{
            state.searchedQuery = action.payload
        }
    }
})


export const {SetsearchedQuerry,SetAllJobs, SetSingleJob, SetAllAdminJobs, SetSearchJobByText,SetAllAppliedJobs} = jobSlice.actions;    // for add jobs in intitail state
export default jobSlice.reducer                 // for get all jobs from state thorugh reducer