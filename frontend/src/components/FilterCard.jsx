import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { MapPin, DollarSign, Briefcase } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { SetsearchedQuerry } from '../redux/jobSlice'


const filterArray = [
    {
        filterType : "Location",
        array : ["Karachi", "Hyderabad", "Lahore", "Islamabad","Sakhar", "Larkana"],
        icon : <MapPin />
    },
    {
        filterType : "Industry",
        array : ["Frontend Developer", "Backend Developer", "Full Stack Developer",],
        icon : <Briefcase />
    },
    {
        filterType : "Salary",
        array : ["0-40k", "40k-1Lakh", "1lakh-5lakh"],
        icon : <DollarSign />
    },
   
]

const FilterCard = () => {
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue]= useState('');

    const changeHandler =(value)=>{
        setSelectedValue(value)
    }

    useEffect(()=>{
        dispatch(SetsearchedQuerry(selectedValue))
    },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
       <h1 className='text-lg font-bold'>Filter Jobs</h1>
       <hr className='mt-3' />
       <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
            filterArray.map((data, index)=> (
                <div  key={index}>
                    <h1 className='text-lg font-bold'>{data.filterType}</h1>
                    {
                        data.array.map((item, idx)=> {
                            const itemId = `id${index}-${idx}`
                            return(
                            <div className='flex items-center space-x-2 my-2' key={itemId}>
                                <RadioGroupItem value={item} id={itemId} />
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        )})
                    }
                </div>
            ))
        }
       </RadioGroup>
    
    </div>
  )
}

export default FilterCard
