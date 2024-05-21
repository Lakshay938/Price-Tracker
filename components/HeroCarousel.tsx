'use client'
import React from 'react'
import Image from 'next/image' 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const heroImages = [
    {src:'/assets/images/hero-1.svg',alt:'smartwatch'},
    {src:'/assets/images/hero-2.svg',alt:'bag'},
    {src:'/assets/images/hero-3.svg',alt:'lamp'},
    {src:'/assets/images/hero-4.svg',alt:'air fryer'},
    {src:'/assets/images/hero-5.svg',alt:'chair'},
]

export const HeroCarousel = () => {
  return (
    <div className='hero-carousel '>
        <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={true}
        showStatus={false}
        >
                {heroImages.map((images)=>(
                    <Image
                    src={images.src}
                    alt={images.alt}
                    key={images.alt}
                    height={484}
                    width={484}
                    />
                ))}
            </Carousel>
    </div>
  )
}
