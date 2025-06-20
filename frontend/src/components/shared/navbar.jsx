import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RiUser2Fill, RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
// import { toast} from "../ui/sonner"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";





const Navbar = () => {

  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`);
      if (response.data.success) {
        dispatch(setUser(null));    // set user to null
        toast.success("Logged out successfully");
        navigate("/");
      }


    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              {" "}
              Job <span className=" text-[#f83002]">Portal </span>{" "}
            </h1>
          </div>

          <div className="bg-white flex items-center gap-12 ">
            <ul className="flex font-medium items-center gap-5 cursor-pointer">
              {
                user && user.role === "recruiter" ? (
                  <>
                    <li> <Link to={"/admin/company"}>Company </Link> </li>
                    <li> <Link to={"/admin/jobs"}> Jobs</Link> </li>
                  </>
                ) : (
                  <>
                    <li> <Link to={"/"}>Home </Link> </li>
                    <li> <Link to={"/jobs"}> Jobs</Link> </li>
                    <li> <Link to={"/browse"}> Browse</Link> </li>
                  </>

                )
              }

            </ul>
            {!user ? (
              <div className="flex items-center gap-2 cursor-pointer ">
                <Link to="/login">  <Button variant="outline" className="cursor-pointer">Login</Button></Link>
                <Link to="/signup">  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">SignUp</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-1 gap-2 text-gray-600">

                    {
                      user && user.role === "student" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">

                          <RiUser2Fill />
                          <Button variant="link"> <Link to="/profile"> View Profile</Link></Button>
                        </div>
                      )
                    }


                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <RiLogoutBoxFill />
                      <Button className="cursor-pointer" onClick={logOutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
