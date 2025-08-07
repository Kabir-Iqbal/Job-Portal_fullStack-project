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

    const searchHandler = (query) => {
        dispatch(SetsearchedQuerry(query))
        navigate('/browse')
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Carousel className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl mx-auto my-12 sm:my-16 lg:my-20">
                <CarouselContent>
                    {
                        categories.map((category, index) => (
                            <CarouselItem key={index} className="basis-full xs:basis-1/2 sm:basis-1/2 lg:basis-1/3">
                                <div className='flex justify-center'>
                                    <Button 
                                        onClick={() => searchHandler(category)} 
                                        variant="outline" 
                                        className=" w-[70%] px-auto sm:w-full rounded-full text-xs xs:text-sm sm:text-base"
                                    >
                                        {category}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] xxs:left-[-20px] sm:left-[-80px]" />
                <CarouselNext className="right-[-16px] xxs:right-[-20px] sm:right-[-80px]" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel