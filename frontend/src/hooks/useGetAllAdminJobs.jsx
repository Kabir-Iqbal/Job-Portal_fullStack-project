import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utils/constant'
import { useDispatch } from 'react-redux'
import { SetAllAdminJobs } from '../redux/jobSlice'

const useGetAllAdminJobs = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {

                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
                    withCredentials: true
                });

                // console.log("res.data.jobs", res.data.jobs);

                if (res.data.success) {
                    dispatch(SetAllAdminJobs(res.data.jobs))
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchAdminJobs()

    }, [])

}

export default useGetAllAdminJobs