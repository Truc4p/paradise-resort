import Booking from "@/components/Booking";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl">We're here to help plan your perfect stay</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: FaMapMarkerAlt, title: 'Address', info: 'Non Nuoc Beach, Da Nang, Vietnam' },
              { icon: FaPhone, title: 'Phone', info: '+84 236 3959 888' },
              { icon: FaEnvelope, title: 'Email', info: 'info@paradiseresort.com' },
              { icon: FaClock, title: 'Hours', info: '24/7 Reception' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-3xl text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <Booking />

      {/* Map Section */}
      <section className="h-96 bg-gray-200">
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
    </div>
  );
}
