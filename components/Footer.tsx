import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {/* About */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">Paradise Resort</h3>
            <p className="text-sm text-gray-400 tracking-wide uppercase mb-4 font-medium">Luxury Beachfront</p>
            <p className="text-gray-400 leading-relaxed font-light">
              Your ultimate beachfront destination for luxury, relaxation, and unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#rooms" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 font-light hover:translate-x-1 inline-block">Rooms & Suites</a></li>
              <li><a href="#dining" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 font-light hover:translate-x-1 inline-block">Dining</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 font-light hover:translate-x-1 inline-block">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 font-light hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 group">
                <FaMapMarkerAlt className="mr-3 mt-1 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="font-light">Da Nang, Vietnam</span>
              </li>
              <li className="flex items-start text-gray-400 group">
                <FaPhone className="mr-3 mt-1 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="font-light">+84 123 456 789</span>
              </li>
              <li className="flex items-start text-gray-400 group">
                <FaEnvelope className="mr-3 mt-1 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="font-light">info@paradiseresort.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/30">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/30">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/30">
                <FaTwitter className="text-xl" />
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500 font-light">Experience luxury at its finest</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-light">&copy; 2025 Paradise Resort. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors font-light">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors font-light">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors font-light">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
