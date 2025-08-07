import React, { useEffect } from "react";
import Navbar from "../shared/navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading , setUser} from "../../redux/authSlice";
import { Loader2 } from "lucide-react";




const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading ,user} = useSelector((store) => store.auth);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
     if (user) {
       navigate('/')
     }
  },[])

  return (
    <div className="bg-gray-50 min-h-screen">
    <Navbar />
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white border border-gray-200 rounded-lg p-6 shadow-md"
      >
        <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={input.password}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <RadioGroup className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={handleChange}
                className="cursor-pointer"
              />
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
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-4">
          {loading ? (
            <Button
              type="button"
              disabled
              className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] cursor-not-allowed"
            >
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
            >
              Login
            </Button>
          )}
        </div>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#6A38C2] hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
  );
};

export default Login;
