import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { useSelector } from 'react-redux'
import useGetCompanies from '../../hooks/useGetAllCompanies'
import { useEffect } from 'react'
import store from '../../redux/store'
import { useNavigate } from 'react-router-dom'




const AdminJobsTable = () => {

    const { companies } = useSelector(store => store.company)
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const { searchCompanyByText } = useSelector(store => store.company)
    const [filterJob, setFilterJobs] = useState([allAdminJobs])

    const navigate = useNavigate()

    useEffect(() => {
        if (!Array.isArray(allAdminJobs)) return;

        const filteredCompany = allAdminJobs.length > 0 ? allAdminJobs.filter((job) => {
            if (!searchJobByText) {      // if text is empty everything will show
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())  // if text is availble then show only matched companies with text

        }):[];
        // console.log("filteredCompany", filteredCompany)

        setFilterJobs(filteredCompany)
    }, [allAdminJobs, searchJobByText])


    return (
        <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(filterJob) && filterJob.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>You haven't registered any company yet.</TableCell>
                        </TableRow>
                    ) : (
                        filterJob?.map((job) => (
                            <TableRow key={job._id || "N/A"}>
                                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                                <TableCell>{job?.title || "N/A"}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer '>
                                                <Edit2 className='w-4 ' />
                                                <span className='cursor-pointer'>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>



        </Table>
    )
}

export default AdminJobsTable