'use client';

import Image from 'next/image';
import Link from 'next/link';
import HealthResort from '@/components/HealthResort';
import { FaHeartbeat, FaCalendarAlt, FaPhone, FaEnvelope, FaAward } from 'react-icons/fa';

export default function HealthResortPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070"
          alt="Health Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-teal-900/70"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20">
            <FaHeartbeat className="text-2xl animate-pulse" />
            <span className="uppercase tracking-wider text-sm font-semibold">Health Resort</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Journey to Optimal Health
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Immerse yourself in a transformative health experience. Medical expertise meets holistic wellness in paradise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Start Your Journey
            </Link>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border border-white/30">
              View Programs
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionize Your Wellbeing
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Our health resort offers comprehensive, medically supervised programs designed to address your 
              unique health concerns. Whether you're seeking weight management, stress relief, cardiac wellness, 
              or longevity optimization, our expert team creates personalized pathways to lasting health transformation.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">20+</div>
                <div className="text-gray-600">Medical Experts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">12</div>
                <div className="text-gray-600">Health Programs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
                <div className="text-gray-600">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <HealthResort />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-4">
                <FaAward className="text-2xl" />
                <span className="uppercase tracking-wider text-sm">Why Choose Us</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">The Paradise Health Difference</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge medical science with holistic healing traditions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Medical Excellence',
                  description: 'Board-certified physicians and specialists with decades of experience in integrative medicine',
                  icon: '🩺'
                },
                {
                  title: 'Personalized Care',
                  description: 'Every program is tailored to your unique health profile, goals, and lifestyle',
                  icon: '👤'
                },
                {
                  title: 'Holistic Approach',
                  description: 'We address mind, body, and spirit through evidence-based and traditional healing methods',
                  icon: '🌿'
                },
                {
                  title: 'Paradise Setting',
                  description: 'Healing happens faster in nature - our beachfront location enhances your recovery',
                  icon: '🏝️'
                },
                {
                  title: 'Lasting Results',
                  description: 'Our follow-up programs ensure your health gains continue long after you leave',
                  icon: '📈'
                },
                {
                  title: 'Luxury Comfort',
                  description: 'Five-star accommodations and amenities make your health journey truly enjoyable',
                  icon: '⭐'
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Booking */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Begin Your Transformation</h2>
              <p className="text-xl text-gray-600">
                Take the first step towards optimal health
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FaPhone />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">+1 (555) 789-0123</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FaEnvelope />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">health@paradiseresort.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <div className="font-semibold">Consultation Hours</div>
                      <div className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-emerald-50 rounded-xl">
                  <div className="font-semibold text-emerald-800 mb-2">Free Health Assessment</div>
                  <p className="text-sm text-gray-600">
                    Schedule a complimentary 30-minute consultation with our medical team to discuss your health goals.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Popular Programs</h3>
                <div className="space-y-4">
                  {[
                    { name: '7-Day Detox & Renewal', price: 'From $3,500' },
                    { name: '14-Day Weight Management', price: 'From $6,200' },
                    { name: '10-Day Stress Recovery', price: 'From $4,800' },
                    { name: '21-Day Longevity Program', price: 'From $9,500' }
                  ].map((program, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div>
                        <div className="font-semibold">{program.name}</div>
                        <div className="text-sm text-white/80">{program.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-white text-emerald-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Request Program Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Healing Environment</h2>
            <p className="text-xl text-gray-600">
              Experience wellness in our world-class facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070',
              'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070'
            ].map((src, index) => (
              <div key={index} className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={src}
                  alt={`Health facility ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/gallery" 
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Explore Our Facilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
