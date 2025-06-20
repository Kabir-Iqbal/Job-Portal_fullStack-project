import React from "react";
import Navbar from "../shared/navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link,useNavigate  } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input , setInput] = useState({
        fullName : "",
        email : "",
        phoneNumber : "",
        password : "",
        role : "",
        file : "",
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(store => store.auth)


    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }

    const ChangeFileHandler = (e) => {
        setInput({...input, file: e.target.files?.[0]})
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // formData is used to send the data to the server in multipart/form-data format
        const formData = new FormData()
        formData.append("fullname", input.fullName)
        formData.append("email", input.email)
        formData.append("phonenumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if(input.file){
            formData.append("file", input.file)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true,
            })
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }
    }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mx-auto max-w-7xl">
        <form
           onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 gap-8 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" name="fullName" onChange={handleChange} value={input.fullName} placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" onChange={handleChange} value={input.email} placeholder="Enter your email" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" name="phoneNumber" onChange={handleChange} value={input.phoneNumber} placeholder="Enter your phone number" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name="password" onChange={handleChange} value={input.password} placeholder="Enter your password" />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                 type="radio" 
                 id="student" 
                 name="role" 
                 value="student"
                 checked={input.role === "student"}
                 onChange={handleChange}
                 className="cursor-pointer" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                 type="radio" 
                 id="recruiter" 
                 name="role" 
                 value="recruiter"
                 checked={input.role === "recruiter"}
                 onChange={handleChange}
                 className="cursor-pointer" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input type="file"
                accept="image/*"
                onChange={ChangeFileHandler}
                className="cursor-pointer" />

            </div>
          </div>
          {loading ? (
            <Button className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer">
              {" "}
              <Loader2 className="w-full h-4  animate-spin"  />{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer"
            >
              Signup
            </Button>
          )}

          <p className="text-sm my-1 ">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6A38C2]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
