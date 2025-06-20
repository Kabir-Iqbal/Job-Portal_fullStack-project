import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { FaFontAwesomeLogoFull } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "./utils/constant";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";





const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);


    const {user} = useSelector((state) => state.auth);
    

    const dispatch = useDispatch();

    const [input, setInput] = useState ({
        fullname: user?.fullname || "",
        email: user?.email || "",
        number: user?.phonenumber || "",
        bio: user?.profile?.bio || "",
        // skills: user?.profile?.skills.map((skill) => skill) || "",
        file : user?.profile?.resume,
    })

    const ChangeHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("formData", formData);
        
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("number", input.number);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
    
     
        
        try {
            setLoading(true);
          
            const response = await axios.put(
              `${USER_API_END_POINT}/profile/update`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              }
            );
          
            // console.log("response", response.data); // ✅ yahan hona chahiye
            
            if (response.data.success) {
              dispatch(setUser(response.data.user));
              toast.success(response?.data?.message || "Profile updated successfully!");
              setOpen(false);
            }
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
          
        
        
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file})
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid py-4 gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right"> Name</label>
                <Input
                  type="text"
                  id="name"
                  className="col-span-3"
                  value={input.fullname}
                  onChange={ChangeHandler}

                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">Email</label>
                <Input
                  type="email"
                  id="email"
                  value={input.email}
                  onChange={ChangeHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="number" className="text-right">Number</label>
                <Input
                  type="number"
                  id="number"
                  value={input.number}
                  onChange={ChangeHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="bio" className="text-right">Bio</label>
                <Input
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={ChangeHandler}
                  className="col-span-3"
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="skills" className="text-right">Skills</label>
                <Input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={ChangeHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="resume" className="text-right">Resume</label>
                <Input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  id="resume"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
            {
            loading ? (<Button className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer"> Please wait {" "} 
              <Loader2 className="w-full h-4  animate-spin"  />{" "}</Button>   ) : (<Button type="submit"className="w-full bg-[#6A38C2]  hover:bg-[#5b30a6] cursor-pointer">Update</Button>)
            }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;