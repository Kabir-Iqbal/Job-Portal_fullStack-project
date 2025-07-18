import { APPLICATION_API_END_POINT } from "../components/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetAllAppliedJobs } from "../redux/jobSlice";


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {

                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    console.log("response at hook",res.data);
                    
                    dispatch(SetAllAppliedJobs(res.data.applications))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAppliedJobs()
    }, [])
}


export default useGetAppliedJobs;