import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'


const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerCompany = async()=>{
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
        headers :{
            'Content-Type' : 'application/json'
      },
      withCredentials: true
    })
  
    

    if (res.data.success) {
       toast.success(res.data.message)
       dispatch(setSingleCompany(res.data.company))
       const companyId = res?.data?.company?._id
       console.log("companyId",companyId);
       
       navigate(`/admin/companies/${companyId}`)
    }
      
    } catch (error) {
      toast.error(res.data.error.message || 'something went wrong');
      
    }
  }

  return (
     <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="my-6 sm:my-10">
            <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              What would you like to give your company name? You can change this later.
            </p>
          </div>

          {/* Input */}
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-8 sm:my-10">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={registerCompany}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate