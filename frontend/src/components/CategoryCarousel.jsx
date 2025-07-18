import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { SetsearchedQuerry } from '../redux/jobSlice';


const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "DevOps Engineer",
        "Data Scientist",
        "AI/ML Engineer",
    ]


    const searchHandler = (query)=>{
        dispatch(SetsearchedQuerry(query))
        navigate('/browse')
      }

      
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>
            <CarouselContent>
                {
                    categories.map((category, index) => (
                        <CarouselItem key={index} className='md:basis-1/2  lg:basis-1/3'>
                            <div>
                                <Button onClick={()=>searchHandler(category)} variant={"outline"} className='rounded-full'>{category}</Button>
                            </div>
                        </CarouselItem>
                    ))
                }
            
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel
