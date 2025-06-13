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




const Navbar = () => {

  const {user} = useSelector((state)=> state.auth)

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
              <li> <Link to={"/"}>Home </Link> </li>
              <li> <Link to={"/jobs"}> Jobs</Link> </li>
              <li> <Link to={"/browse"}> Browse</Link> </li>
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
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Kabir MernStack</h4>
                      <p className="text-sm text-muted-foreground">
                        lorem ipsum dolor sit amet consectetur adipisic.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-1 gap-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <RiUser2Fill />
                      <Button variant="link"> <Link to="/profile"> View Profile</Link></Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <RiLogoutBoxFill />
                      <Button variant="link">Logout</Button>
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
