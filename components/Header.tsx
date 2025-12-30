'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Rooms & Suites', 
      href: '/rooms',
      dropdown: [
        { name: 'Deluxe Ocean View', href: '/rooms#deluxe' },
        { name: 'Premium Suite', href: '/rooms#premium' },
        { name: 'Presidential Villa', href: '/rooms#presidential' },
      ]
    },
    { 
      name: 'Dining', 
      href: '/dining',
      dropdown: [
        { name: 'Ocean Breeze Restaurant', href: '/dining#ocean-breeze' },
        { name: 'Seaside Grill', href: '/dining#seaside-grill' },
        { name: 'Sunset Lounge', href: '/dining#sunset-lounge' },
      ]
    },
    { name: 'Special Offers', href: '/offers' },
    { name: 'Activities', href: '/activities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-white/95 backdrop-blur-md shadow-md py-4'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 bg-clip-text text-transparent tracking-tight">
                Paradise Resort
              </div>
              <div className="text-xs text-gray-500 tracking-[0.2em] font-medium">LUXURY BEACHFRONT</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium rounded-lg hover:bg-primary-50"
                >
                  {link.name}
                  {link.dropdown && <FaChevronDown className="text-xs" />}
                </Link>
                
                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeIn">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 space-y-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-sm text-gray-600 hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        → {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" className="btn-primary w-full mt-4 text-center" onClick={() => setIsMenuOpen(false)}>
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
