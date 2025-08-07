import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { useSelector } from 'react-redux'
import useGetCompanies from '../../hooks/useGetAllCompanies'
import { useEffect } from 'react'
import store from '../../redux/store'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    useGetCompanies()
    const { companies } = useSelector(store => store.company )
    const {searchCompanyByText} = useSelector(store=> store.company)
    const [filterCompany, setFilterCompany] =  useState([])

    const navigate = useNavigate()
 
    useEffect(()=>{
        const filteredCompany = companies.length > 0 ?  companies.filter((company)=>{
            if (!searchCompanyByText) {      // if text is empty everything will show
                return true 
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())    // if text is availble then show only matched companies with text

        }):[];
        setFilterCompany(filteredCompany)
    },[companies, searchCompanyByText])
    
    
    return (
        // <Table>
        //     <TableCaption>A list of your recent registered companies</TableCaption>
        //     <TableHeader>
        //         <TableRow>
        //             <TableHead>Logo</TableHead>
        //             <TableHead>Name</TableHead>
        //             <TableHead>Date</TableHead>
        //             <TableHead className='text-right'>Action</TableHead>
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //         {
        //             filterCompany.length === 0 ? <tr>You have't registered any company yet. </tr> : (
        //                 <>
        //                     {
        //                         filterCompany?.map((company) => {
        //                             return (
        //                                 <tr key={company?._id}>
        //                                     <TableCell>
        //                                         <Avatar>
        //                                             <AvatarImage src={company?.logo} />
        //                                         </Avatar>
        //                                     </TableCell>
        //                                     <TableCell>{company?.name}</TableCell>
        //                                     <TableCell>{company.createdAt.split("T")[0]} </TableCell>
        //                                     <TableCell className='text-right cursor-pointer'>
        //                                         <Popover>
        //                                             <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
        //                                             <PopoverContent className="w-32">
        //                                                 <div onClick={()=> navigate(`/admin/companies/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer '>
        //                                                     <Edit2 className='w-4 ' />
        //                                                     <span className='cursor-pointer'>Edit</span>
        //                                                 </div>
        //                                             </PopoverContent>
        //                                         </Popover>
        //                                     </TableCell>
        //                                 </tr>
        //                             )
        //                         })
        //                     }
        //                 </>
        //             )
        //         }

        //     </TableBody>


        // </Table>
        <div className="overflow-x-auto rounded-lg border mt-6">
      <Table className="min-w-[600px]">
        <TableCaption className="text-sm text-gray-500 mt-4">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-700 font-semibold">Logo</TableHead>
            <TableHead className="text-gray-700 font-semibold">Name</TableHead>
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company?._id} className="hover:bg-gray-50">
                <TableCell>
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company?.name}</TableCell>
                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div
                        onClick={() => navigate(`/admin/companies/${company?._id}`)}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    )
}

export default CompaniesTable