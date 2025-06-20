import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../components/utils/constant'
import { useDispatch } from 'react-redux'

import {setCompanies, } from "../redux/companySlice"

const useGetCompanies = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCompanies = async () => {
            try {

                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                });

                console.log("res.data", res.data);
                console.log("res.data", res.data.companies);



                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies))
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchCompanies()

    }, [])

}

export default useGetCompanies