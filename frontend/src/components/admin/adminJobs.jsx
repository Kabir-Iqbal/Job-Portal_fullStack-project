import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './adminjobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { SetSearchJobByText } from '../../redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const  navigate = useNavigate()
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(SetSearchJobByText(filter))
    },[filter])

    return (
        <div>
            <Navbar />
            <div className=' max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name, role' 
                        onChange={(e)=> setFilter(e.target.value)}/>

                    <Button onClick={()=> navigate("/admin/jobs/create") }> Post new Jobs</Button>
                </div>
                <AdminJobsTable />

            </div>
        </div>
    )
}

export default AdminJobs