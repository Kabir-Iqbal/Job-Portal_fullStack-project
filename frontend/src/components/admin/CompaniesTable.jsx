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
        const filteredCompany = companies.length > 0 && companies.filter((company)=>{
            if (!searchCompanyByText) {      // if text is empty everything will show
                return true 
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())    // if text is availble then show only matched companies with text

        });
        setFilterCompany(filteredCompany)
    },[companies, searchCompanyByText])
    
    
    return (
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterCompany.length === 0 ? <tr>You have't registered any company yet. </tr> : (
                        <>
                            {
                                filterCompany?.map((company) => {
                                    return (
                                        <tr key={company._id}>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company.logo} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]} </TableCell>
                                            <TableCell className='text-right cursor-pointer'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer '>
                                                            <Edit2 className='w-4 ' />
                                                            <span className='cursor-pointer'>Edit</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                    )
                                })
                            }
                        </>
                    )
                }

            </TableBody>


        </Table>
    )
}

export default CompaniesTable