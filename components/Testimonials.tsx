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
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Guest Reviews</h2>
          <p className="section-subtitle">
            Hear what our guests say about their paradise experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <FaQuoteLeft className="text-6xl text-primary-200 absolute top-8 left-8 opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl mx-1" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="text-center">
                <h4 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                <p className="text-sm text-gray-500 mt-2">{testimonials[currentIndex].date}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
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
