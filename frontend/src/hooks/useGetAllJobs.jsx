import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { SetAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {

    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store=>store.job)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {

                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true
                });

                console.log("res.data.jobs", res.data.jobs);

                if (res.data.success) {
                    dispatch(SetAllJobs(res.data.jobs))
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchAllJobs()

    }, [])

}

export default useGetAllJobs