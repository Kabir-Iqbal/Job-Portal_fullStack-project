import React, { useEffect } from 'react'
import Navbar from '../shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch ,useSelector} from 'react-redux'
import { setApplicants } from '../../redux/applicationSlice'


const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)
    useEffect(()=>{
        const fetchApplication = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                    withCredentials:true
                })
                // console.log(res.data);
                dispatch(setApplicants(res.data.job))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchApplication()
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
             <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length || 0})</h1>
             <ApplicantsTable />
        </div>
    </div>
  )
}

export default Applicants