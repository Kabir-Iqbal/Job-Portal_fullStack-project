// import React, { useState } from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { RiUser2Fill, RiLogoutBoxFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "../utils/constant";
// // import { toast} from "../ui/sonner"
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/authSlice";
// import { toast } from "sonner";





// const Navbar = () => {

//   const { user } = useSelector((state) => state.auth)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [open,setOpen] = useState(false)

//   const toogleButton = ()=>{
//     setOpen(!open)
//   }

  
  
//   const logOutHandler = async () => {
//     try {
//       const response = await axios.get(`${USER_API_END_POINT}/logout`);
//       if (response.data.success) {
//         dispatch(setUser(null));    // set user to null
//         toast.success("Logged out successfully");
//         navigate("/");
//       }


//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   }

//   return (
//     <div>
//       <div className="bg-white">
//         <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
//           <div>
//             <h1 className="text-2xl font-bold">
//               {" "}
//               Job <span className=" text-[#f83002]">Portal </span>{" "}
//             </h1>
//           </div>

//           <div className="bg-white flex items-center gap-12 ">
//             <ul className="flex font-medium items-center gap-5 cursor-pointer">
//               {
//                 user && user.role === "recruiter" ? (
//                   <>
//                     <li> <Link to={"/admin/company"}>Company </Link> </li>
//                     <li> <Link to={"/admin/jobs"}> Jobs</Link> </li>
//                   </>
//                 ) : (
//                   <>
//                     <li> <Link to={"/"}>Home </Link> </li>
//                     <li> <Link to={"/jobs"}> Jobs</Link> </li>
//                     <li> <Link to={"/browse"}> Browse</Link> </li>
//                   </>

//                 )
//               }

//             </ul>
//             {!user ? (
//               <div className="flex items-center gap-2 cursor-pointer ">
//                 <Link to="/login">  <Button variant="outline" className="cursor-pointer">Login</Button></Link>
//                 <Link to="/signup">  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">SignUp</Button></Link>
//               </div>
//             ) : (
//               <Popover>
//                 <PopoverTrigger>
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage
//                       src={user?.profile?.profilePhoto}
//                       alt="@shadcn"
//                     />
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                   <div className="flex gap-2">
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="@shadcn"
//                       />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {user?.profile?.bio}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col mt-1 gap-2 text-gray-600">

//                     {
//                       user && user.role === "student" && (
//                         <div className="flex w-fit items-center gap-2 cursor-pointer">

//                           <RiUser2Fill />
//                           <Button variant="link"> <Link to="/profile"> View Profile</Link></Button>
//                         </div>
//                       )
//                     }


//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <RiLogoutBoxFill />
//                       <Button className="cursor-pointer" onClick={logOutHandler} variant="link">Logout</Button>
//                     </div>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RiUser2Fill, RiLogoutBoxFill } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { setUser } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Left: Logo */}
        <div className="text-2xl font-bold">
          Job <span className="text-[#f83002]">Portal</span>
        </div>

        {/* Right: Mobile - Profile + Toggle */}
        <div className="flex items-center gap-3 sm:hidden">
          {/* {user && (
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
            </Avatar>
          )} */}
          {/* Auth/Profile */}
          {!user ? (
            <div className="flex hidden gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-gray-600">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <RiUser2Fill />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <RiLogoutBoxFill />
                    <Button variant="link" onClick={logOutHandler}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <div onClick={toggleMenu}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>

        {/* Right: Desktop - NavLinks + Auth/Profile */}
        <div className="hidden sm:flex items-center gap-6">
          {/* NavLinks */}
          <ul className="flex gap-6 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Company</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth/Profile */}
          {!user ? (
            <div className=" flex gap-2">
              <Link className="" to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-gray-600">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <RiUser2Fill />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <RiLogoutBoxFill />
                    <Button variant="link" onClick={logOutHandler}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 py-2 mt-2 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={() => setOpen(false)}>Company</Link></li>
                <li><Link to="/admin/jobs" onClick={() => setOpen(false)}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link></li>
                <li><Link to="/browse" onClick={() => setOpen(false)}>Browse</Link></li>
              </>
            )}
          </ul>

          {/* Mobile Auth/Profile */}
          {!user ? (
            <div className="flex  gap-2 mt-4">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></Link>
            </div>
          ) : (
            <div className="mt-4">
              <Button variant="outline" onClick={logOutHandler}>Logout</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;



