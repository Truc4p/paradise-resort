'use client';

import Booking from "@/components/Booking";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>('booking');

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 scale-105 transition-transform duration-700"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-slideUp">
          <div className="inline-block mb-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <p className="text-sm font-medium tracking-wider">GET IN TOUCH</p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">Contact Us</h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto leading-relaxed">
            We're here to help plan your perfect stay
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a href="#contact-info" className="btn-primary">Get Started</a>
            <a href="tel:+842363959888" className="btn-secondary">
              <FaPhone className="inline mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Information Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Reach Out to Us</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our team
            </p>
          </div>
          
          <div id="contact-info" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                icon: FaMapMarkerAlt, 
                title: 'Visit Us', 
                info: 'Non Nuoc Beach, Da Nang, Vietnam',
                subInfo: 'Beachfront Location',
                color: 'from-blue-500 to-blue-600',
                link: '#map'
              },
              { 
                icon: FaPhone, 
                title: 'Call Us', 
                info: '+84 236 3959 888',
                subInfo: 'Direct Line',
                color: 'from-green-500 to-green-600',
                link: 'tel:+842363959888'
              },
              { 
                icon: FaEnvelope, 
                title: 'Email Us', 
                info: 'info@paradiseresort.com',
                subInfo: 'Quick Response',
                color: 'from-purple-500 to-purple-600',
                link: 'mailto:info@paradiseresort.com'
              },
              { 
                icon: FaClock, 
                title: 'Open Hours', 
                info: '24/7 Reception',
                subInfo: 'Always Available',
                color: 'from-orange-500 to-orange-600',
                link: '#booking'
              },
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.link}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <item.icon className="text-4xl text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{item.info}</p>
                <p className="text-sm text-gray-500">{item.subInfo}</p>
              </a>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Connect With Us</h3>
            <p className="text-gray-600 mb-6">Follow us on social media for updates and special offers</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: FaWhatsapp, color: 'hover:bg-green-500', link: '#' },
                { icon: FaFacebook, color: 'hover:bg-blue-600', link: '#' },
                { icon: FaInstagram, color: 'hover:bg-pink-500', link: '#' },
                { icon: FaTwitter, color: 'hover:bg-blue-400', link: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl`}
                >
                  <social.icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tab Section for Booking and Inquiry */}
      <section id="booking" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How Can We Help?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose how you'd like to get in touch with us
            </p>
            
            {/* Tab Navigation */}
            <div className="inline-flex rounded-full bg-white p-2 shadow-lg border border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'booking'
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Make a Booking
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'inquiry'
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                General Inquiry
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fadeIn">
            {activeTab === 'booking' ? (
              <Booking />
            ) : (
              <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                        <option>General Inquiry</option>
                        <option>Room Information</option>
                        <option>Special Requests</option>
                        <option>Event Planning</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Message *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section id="map" className="relative h-[500px] bg-gray-200">
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 bg-white px-8 py-4 rounded-full shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-900">📍 Find Us on the Map</p>
        </div>
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168559627!2d108.24906631533098!3d15.987134545950235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sNon%20Nuoc%20Beach!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Quick Answers</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { q: 'Cancellation Policy', link: '#' },
                { q: 'Payment Methods', link: '#' },
                { q: 'Check-in Times', link: '#' },
              ].map((faq, index) => (
                <a
                  key={index}
                  href={faq.link}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <p className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">{faq.q}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
