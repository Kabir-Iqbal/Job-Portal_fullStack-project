// // import React, { useEffect, useState } from 'react'
// // import { Badge } from './ui/badge'
// // import { MapPin, DollarSign, Briefcase } from 'lucide-react'
// // import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// // import { Label } from './ui/label'
// // import { useDispatch } from 'react-redux'
// // import { SetsearchedQuerry } from '../redux/jobSlice'


// // const filterArray = [
// //     {
// //         filterType : "Location",
// //         array : ["Karachi", "Hyderabad", "Lahore", "Islamabad","Sakhar", "Larkana"],
// //         icon : <MapPin />
// //     },
// //     {
// //         filterType : "Industry",
// //         array : ["Frontend Developer", "Backend Developer", "Full Stack Developer",],
// //         icon : <Briefcase />
// //     },
// //     {
// //         filterType : "Salary",
// //         array : ["0-40k", "40k-1Lakh", "1lakh-5lakh"],
// //         icon : <DollarSign />
// //     },
   
// // ]

// // const FilterCard = () => {
// //     const dispatch = useDispatch()
// //     const [selectedValue, setSelectedValue]= useState('');

// //     const changeHandler =(value)=>{
// //         setSelectedValue(value)
// //     }

// //     useEffect(()=>{
// //         dispatch(SetsearchedQuerry(selectedValue))
// //     },[selectedValue])

// //   return (
// //     <div className='w-full bg-white p-3 rounded-md'>
// //        <h1 className='text-lg font-bold'>Filter Jobs</h1>
// //        <hr className='mt-3' />
// //        <RadioGroup value={selectedValue} onValueChange={changeHandler} >
// //         {
// //             filterArray.map((data, index)=> (
// //                 <div  key={index}>
// //                     <h1 className='text-lg font-bold'>{data.filterType}</h1>
// //                     {
// //                         data.array.map((item, idx)=> {
// //                             const itemId = `id${index}-${idx}`
// //                             return(
// //                             <div className='flex items-center space-x-2 my-2' key={itemId}>
// //                                 <RadioGroupItem value={item} id={itemId} />
// //                                 <Label htmlFor={itemId}>{item}</Label>
// //                             </div>
// //                         )})
// //                     }
// //                 </div>
// //             ))
// //         }
// //        </RadioGroup>
    
// //     </div>
// //   )
// // }

// // export default FilterCard

// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { MapPin, DollarSign, Briefcase } from 'lucide-react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { SetsearchedQuerry } from '../redux/jobSlice'

// const filterArray = [
//     {
//         filterType: "Location",
//         array: ["Karachi", "Hyderabad", "Lahore", "Islamabad", "Sakhar", "Larkana"],
//         icon: <MapPin className="w-4 h-4 xxs:w-5 xxs:h-5" />
//     },
//     {
//         filterType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
//         icon: <Briefcase className="w-4 h-4 xxs:w-5 xxs:h-5" />
//     },
//     {
//         filterType: "Salary",
//         array: ["0-40k", "40k-1Lakh", "1lakh-5lakh"],
//         icon: <DollarSign className="w-4 h-4 xxs:w-5 xxs:h-5" />
//     },
// ]

// const FilterCard = () => {
//     const dispatch = useDispatch()
//     const [selectedValue, setSelectedValue] = useState('');

//     const changeHandler = (value) => {
//         setSelectedValue(value)
//     }

//     useEffect(() => {
//         dispatch(SetsearchedQuerry(selectedValue))
//     }, [selectedValue])

//     return (
//         <div className="w-full bg-white p-2 xxs:p-3 xs:p-4 sm:p-5 rounded-md">
//             <h1 className="text-base xxs:text-lg sm:text-xl font-bold">Filter Jobs</h1>
//             <hr className="mt-2 xxs:mt-3" />
//             <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//                 {filterArray.map((data, index) => (
//                     <div key={index} className="mt-2 xxs:mt-3 xs:mt-4">
//                         <h1 className="text-sm xxs:text-base sm:text-lg font-bold flex items-center gap-1 xxs:gap-2">
//                             {data.icon}
//                             {data.filterType}
//                         </h1>
//                         {data.array.map((item, idx) => {
//                             const itemId = `id${index}-${idx}`
//                             return (
//                                 <div className="flex items-center space-x-1 xxs:space-x-2 my-1 xxs:my-2" key={itemId}>
//                                     <RadioGroupItem value={item} id={itemId} />
//                                     <Label htmlFor={itemId} className="text-xs xxs:text-sm sm:text-base">{item}</Label>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 ))}
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard



import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { MapPin, DollarSign, Briefcase } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { SetsearchedQuerry } from '../redux/jobSlice'
import { Button } from './ui/button'

const filterArray = [
    {
        filterType: "Location",
        array: ["Karachi", "Hyderabad", "Lahore", "Islamabad", "Sakhar", "Larkana"],
        icon: <MapPin className="w-4 h-4 xxs:w-5 xxs:h-5" />
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
        icon: <Briefcase className="w-4 h-4 xxs:w-5 xxs:h-5" />
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1Lakh", "1lakh-5lakh"],
        icon: <DollarSign className="w-4 h-4 xxs:w-5 xxs:h-5" />
    },
]

const FilterCard = ({ onClose }) => {
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState('');

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(SetsearchedQuerry(selectedValue))
    }, [selectedValue])

    return (
        <div className="w-full bg-white p-2 xxs:p-3 xs:p-4 sm:p-5 rounded-md shadow-lg md:shadow-none">
            <div className="flex justify-between items-center md:hidden mb-3 xxs:mb-4">
                <h1 className="text-base xxs:text-lg sm:text-xl font-bold">Filter Jobs</h1>
                <Button 
                    onClick={onClose} 
                    className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-xs xxs:text-sm px-3 xxs:px-4"
                >
                    Close
                </Button>
            </div>
            <hr className="mt-2 xxs:mt-3 md:block" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterArray.map((data, index) => (
                    <div key={index} className="mt-2 xxs:mt-3 xs:mt-4">
                        <h1 className="text-sm xxs:text-base sm:text-lg font-bold flex items-center gap-1 xxs:gap-2">
                            {data.icon}
                            {data.filterType}
                        </h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`
                            return (
                                <div className="flex items-center space-x-1 xxs:space-x-2 my-1 xxs:my-2" key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="text-xs xxs:text-sm sm:text-base">{item}</Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard