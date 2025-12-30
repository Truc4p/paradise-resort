'use client';

import { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely stunning resort! The staff went above and beyond to make our honeymoon unforgettable. The beachfront villa was paradise.',
    date: 'December 2025'
  },
  {
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Best resort experience I\'ve ever had. The infinity pool, spa treatments, and fine dining exceeded all expectations. Will definitely return!',
    date: 'November 2025'
  },
  {
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 5,
    text: 'A hidden gem in Da Nang. The perfect blend of luxury and tranquility. The sunset views from our balcony were breathtaking every evening.',
    date: 'October 2025'
  },
  {
    name: 'David Martinez',
    location: 'Madrid, Spain',
    rating: 5,
    text: 'Outstanding service and incredible amenities. The beach is pristine, the food is amazing, and the rooms are beautifully designed. Highly recommend!',
    date: 'September 2025'
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((currentIndex + 1) % testimonials.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Testimonials</span>
          </div>
          <h2 className="section-title">Guest Experiences</h2>
          <p className="section-subtitle mt-6">
            Hear what our guests say about their paradise experience
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-100">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl">
              <FaQuoteLeft className="text-2xl text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-3xl mx-1 drop-shadow-sm" />
                ))}
              </div>
              
              <p className="text-2xl md:text-3xl text-gray-700 text-center mb-10 font-light leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 font-light text-lg">{testimonials[currentIndex].location}</p>
                <p className="text-sm text-gray-400 mt-3 font-light">{testimonials[currentIndex].date}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
