import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Paradise Resort</h3>
            <p className="text-gray-400">
              Your ultimate beachfront destination for luxury, relaxation, and unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#rooms" className="text-gray-400 hover:text-primary-400">Rooms & Suites</a></li>
              <li><a href="#dining" className="text-gray-400 hover:text-primary-400">Dining</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-primary-400">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2" />
                Da Nang, Vietnam
              </li>
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-2" />
                +84 123 456 789
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-2" />
                info@paradiseresort.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Paradise Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
