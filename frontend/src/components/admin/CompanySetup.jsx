import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanybyId from '../../hooks/useGetCompanybyId'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanybyId(params.id)

  
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })

  
  
  

  const navigate = useNavigate()

  const [loading, setLoading] = useState()

  const { singleCompany } = useSelector(store => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    

    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)

    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.log("error", error);
      
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    })
  },[])


  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto w-full my-10'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={() => navigate('/admin/companies')} variant={'outline'} className='flex items-center gap-2 text-gray-500 font-semibold' >
              <ArrowLeft />
              <span>Back</span>
            </Button>

            <h1 className='font-bold text-xl '>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
                onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type='file'
                accept='image'
                name='file'
                onChange={changeFileHandler} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer">
              {" "}
              <Loader2 className="w-full h-4  animate-spin" />{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer"
            >
              Update
            </Button>
          )}
        </form>

      </div>
    </div>
  )
}

export default CompanySetup