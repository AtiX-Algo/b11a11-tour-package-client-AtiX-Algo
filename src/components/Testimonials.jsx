// src/components/Testimonials.jsx

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials = () => {
    // In a real app, you would fetch this from a database
    const testimonials = [
        {
            quote: "An absolutely unforgettable experience! The guides were knowledgeable and the itinerary was perfectly planned. The Vagabond Tour made our dream vacation a reality.",
            name: "Sarah L.",
            location: "Sydney, Australia",
            image: "https://i.ibb.co/6n21hgy/user-thumb.jpg" // Replace with actual image URLs
        },
        {
            quote: "I've been on many tours, but this one stands out. The attention to detail and the authentic local experiences were second to none. Highly recommended!",
            name: "David Chen",
            location: "Toronto, Canada",
            image: "https://i.ibb.co/6n21hgy/user-thumb.jpg"
        },
        {
            quote: "Booking was a breeze, and the trip exceeded all our expectations. We saw amazing sights and made memories that will last a lifetime. Thank you!",
            name: "Maria Garcia",
            location: "Madrid, Spain",
            image: "https://i.ibb.co/6n21hgy/user-thumb.jpg"
        },
        {
            quote: "The perfect blend of adventure and comfort. I felt safe and well-cared-for throughout the entire journey. I can't wait to book my next trip with them.",
            name: "Kenji Tanaka",
            location: "Tokyo, Japan",
            image: "https://i.ibb.co/6n21hgy/user-thumb.jpg"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-10">What Our Travelers Say</h2>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1} // Show 1 slide on mobile
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                // Responsive breakpoints
                breakpoints={{
                    // when window width is >= 768px
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    // when window width is >= 1024px
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                className="mySwiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="card bg-base-100 shadow-xl h-full">
                            <div className="card-body">
                                <p className="text-base-content/70">"{testimonial.quote}"</p>
                                <div className="flex items-center mt-4">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={testimonial.image} alt={testimonial.name} />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold">{testimonial.name}</h3>
                                        <p className="text-sm text-base-content/60">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;