import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'

const shortListedStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

   // console.log("applicants",applicants.applications);

   const statusHanler =async(status,id)=>{
        console.log("Called");
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
                withCredentials : true
            })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        
   }
    

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            return(
                            <tr key={item._id}>
                                <TableCell>{item.applicant?.fullname}</TableCell>
                                <TableCell>{item.applicant?.email}</TableCell>
                                <TableCell>{item.applicant?.phonenumber
                                } </TableCell>
                                <TableCell> 
                                    {
                                        item?.applicant?.profile?.resume ? <a  className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume}> {item?.applicant?.profile?.resumeOriginalName} </a> : <span> N/A </span> 
                                    }
                                    </TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split("T")[0]} </TableCell>
                                <TableCell className='float-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListedStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={()=> statusHanler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status} </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable