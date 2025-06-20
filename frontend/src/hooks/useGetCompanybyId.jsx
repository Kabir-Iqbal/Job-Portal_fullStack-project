import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../components/utils/constant'
import { useDispatch } from 'react-redux'

import {setSingleCompany} from "../redux/companySlice"

const useGetCompanybyId = (companyId) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCompanybyId = async () => {
            try {

                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                });

                console.log("res.data.jobs", res.data.jobs);

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchCompanybyId()

    }, [companyId, dispatch])

}

export default useGetCompanybyId