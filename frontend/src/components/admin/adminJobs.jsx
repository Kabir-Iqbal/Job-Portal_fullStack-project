import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './adminjobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { SetSearchJobByText } from '../../redux/jobSlice'

const Adminjobs = () => {
    useGetAllAdminJobs()
    const  navigate = useNavigate()
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(SetSearchJobByText(filter))
    },[filter])

    return (
        <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto my-6 sm:my-10">
            {/* Filter + Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <Input
                className="w-full sm:w-[300px]"
                placeholder="Filter by name, role"
                onChange={(e) => setFilter(e.target.value)}
              />
              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate("/admin/jobs/create")}
              >
                Post new Jobs
              </Button>
            </div>
  
            {/* Jobs Table */}
            <AdminJobsTable />
          </div>
        </div>
      </div>
    )
}

export default Adminjobs