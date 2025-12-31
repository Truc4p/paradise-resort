'use client';

import Image from 'next/image';
import Link from 'next/link';
import MedicalSpa from '@/components/MedicalSpa';
import { FaSpa, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function MedicalSpaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070"
          alt="Medical Spa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/70"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20">
            <FaSpa className="text-2xl" />
            <span className="uppercase tracking-wider text-sm font-semibold">Medical Spa</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where Medicine Meets Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Experience therapeutic excellence in a five-star setting. Our medical spa combines clinical expertise with resort-style pampering.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Book Appointment
            </Link>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border border-white/30">
              View Treatments
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A New Standard in Wellness
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Our medical spa is a sanctuary where advanced medical treatments meet the art of relaxation. 
              Led by board-certified physicians and licensed therapists, we offer treatments that are both 
              therapeutic and indulgent, addressing your physical health while nurturing your spirit.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">15+</div>
                <div className="text-gray-600">Medical Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
                <div className="text-gray-600">Treatment Options</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <MedicalSpa />

      {/* Booking Information */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Book Your Experience</h2>
              <p className="text-xl text-gray-600">
                Schedule your personalized medical spa treatment today
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <FaPhone />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <FaEnvelope />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">spa@paradiseresort.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <div className="font-semibold">Hours</div>
                      <div className="text-gray-600">Daily: 8:00 AM - 9:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Special Packages</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold">Wellness Day Package</div>
                      <div className="text-white/80 text-sm">3 treatments + lunch - $450</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold">Couples Retreat</div>
                      <div className="text-white/80 text-sm">2 massages + champagne - $600</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold">Ultimate Wellness Week</div>
                      <div className="text-white/80 text-sm">7-day program - From $2,500</div>
                    </div>
                  </li>
                </ul>
                <button className="w-full mt-6 bg-white text-teal-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  View All Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Spa Facilities</h2>
            <p className="text-xl text-gray-600">
              Take a glimpse at our serene and luxurious spaces
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070',
              'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070',
              'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070'
            ].map((src, index) => (
              <div key={index} className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={src}
                  alt={`Spa facility ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/gallery" 
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
