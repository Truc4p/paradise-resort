'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCamera, FaPlay, FaInstagram, FaDownload, FaShareAlt, FaHeart, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

const categories = [
  { id: 'all', name: 'All Photos', count: 48 },
  { id: 'rooms', name: 'Rooms & Suites', count: 12 },
  { id: 'dining', name: 'Dining', count: 8 },
  { id: 'beach', name: 'Beach & Pool', count: 10 },
  { id: 'activities', name: 'Activities', count: 9 },
  { id: 'spa', name: 'Spa & Wellness', count: 5 },
  { id: 'events', name: 'Events & Celebrations', count: 4 },
];

const galleryImages = [
  // Rooms & Suites
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070', category: 'rooms', title: 'Ocean View Suite', location: 'Deluxe Suite' },
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070', category: 'rooms', title: 'Luxury Bedroom', location: 'Presidential Suite' },
  { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070', category: 'rooms', title: 'Modern Interior', location: 'Junior Suite' },
  { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070', category: 'rooms', title: 'Spa Bathroom', location: 'Spa Suite' },
  
  // Dining
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070', category: 'dining', title: 'Ocean Breeze Restaurant', location: 'Main Restaurant' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070', category: 'dining', title: 'Seaside Grill', location: 'Beachfront' },
  { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069', category: 'dining', title: 'Sunset Lounge', location: 'Pool Bar' },
  { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070', category: 'dining', title: 'Gourmet Cuisine', location: 'Fine Dining' },
  
  // Beach & Pool
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070', category: 'beach', title: 'Private Beach', location: 'Beach Area' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080', category: 'beach', title: 'Infinity Pool', location: 'Main Pool' },
  { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070', category: 'beach', title: 'Beachfront Cabana', location: 'Beach Cabanas' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070', category: 'beach', title: 'Crystal Waters', location: 'Private Beach' },
  
  // Activities
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070', category: 'activities', title: 'Water Sports', location: 'Beach' },
  { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070', category: 'activities', title: 'Beach Yoga', location: 'Beach Pavilion' },
  { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070', category: 'activities', title: 'Golf Course', location: 'Championship Course' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070', category: 'activities', title: 'Scuba Diving', location: 'Dive Center' },
  
  // Spa & Wellness
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070', category: 'spa', title: 'Spa Treatment', location: 'Luxury Spa' },
  { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070', category: 'spa', title: 'Wellness Center', location: 'Spa & Wellness' },
  { url: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2070', category: 'spa', title: 'Relaxation Area', location: 'Spa Lounge' },
  
  // Events & Celebrations
  { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070', category: 'events', title: 'Beach Wedding', location: 'Beach Venue' },
  { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2070', category: 'events', title: 'Sunset Celebration', location: 'Outdoor Terrace' },
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070', category: 'events', title: 'Private Event', location: 'Grand Ballroom' },
];

const videos = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    title: 'Resort Tour',
    duration: '3:45',
    description: 'Take a virtual tour of our stunning resort',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
    title: 'Experience Paradise',
    duration: '2:30',
    description: 'Discover what makes our resort special',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
    title: 'Dining Excellence',
    duration: '4:15',
    description: 'Explore our world-class restaurants',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070',
    title: 'Activities & Adventures',
    duration: '5:20',
    description: 'All the exciting activities we offer',
  },
];

const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070', likes: 2543, caption: 'Paradise found 🌴' },
  { image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070', likes: 1876, caption: 'Luxury redefined ✨' },
  { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070', likes: 3201, caption: 'Dining with a view 🍽️' },
  { image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070', likes: 2987, caption: 'Sunset moments 🌅' },
  { image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070', likes: 1654, caption: 'Morning yoga bliss 🧘' },
  { image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070', likes: 2234, caption: 'Spa day everyday 💆' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; location: string } | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleLike = (imageUrl: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageUrl)) {
        newSet.delete(imageUrl);
      } else {
        newSet.add(imageUrl);
      }
      return newSet;
    });
  };

  const handleDownload = (imageUrl: string, title: string) => {
    alert(`Download functionality for "${title}" coming soon!`);
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this amazing photo from our resort: ${title}`,
        url: window.location.href,
      });
    } else {
      alert('Share link copied to clipboard!');
    }
  };

  const handleVideoPlay = (videoTitle: string) => {
    alert(`Video player for "${videoTitle}" coming soon!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
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
          <div className="text-6xl mb-6 flex justify-center">
            <FaCamera />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Visual Paradise</h1>
          <p className="text-xl md:text-2xl mb-6">Experience the beauty through our lens</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg font-bold transition-colors">
              View Photos
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white px-8 py-3 rounded-lg font-bold transition-colors">
              Watch Videos
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <FaFilter className="text-primary-600 text-xl flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Photos' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredImages.length} stunning captures
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onClick={() => setSelectedImage(image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(image.url);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedImages.has(image.url) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <FaHeart />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(image.title);
                      }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <FaShareAlt />
                    </button>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm flex items-center gap-1">
                      <FaMapMarkerAlt className="text-accent-400" />
                      {image.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-5xl mb-4 flex justify-center">
              <FaPlay />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Video Gallery</h2>
            <p className="text-xl text-gray-300">
              Watch our resort come to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id}
                className="group cursor-pointer"
                onClick={() => handleVideoPlay(video.title)}
              >
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPlay className="text-primary-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm font-semibold">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-5xl mb-4 flex justify-center text-pink-600">
              <FaInstagram />
            </div>
            <h2 className="section-title">Follow Us on Instagram</h2>
            <p className="section-subtitle">
              @resortparadise - Share your moments with #ResortParadise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {instagramPosts.map((post, index) => (
              <div 
                key={index}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <FaHeart className="text-red-500" />
                    <span className="font-semibold">{post.likes.toLocaleString()}</span>
                  </div>
                  <p className="text-white text-sm">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Follow Us for More
            </button>
          </div>
        </div>
      </section>

      {/* Photo Contest */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-6 flex justify-center text-primary-600">
              <FaCamera />
            </div>
            <h2 className="text-4xl font-bold mb-4">Share Your Resort Experience</h2>
            <p className="text-xl text-gray-700 mb-8">
              Share your best photos from your stay and get featured on our gallery! 
              Win exclusive prizes and vouchers for future stays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Photo submission portal coming soon!')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Submit Your Photos
              </button>
              <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                Contest Rules
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience a Virtual Tour</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our resort from the comfort of your home with our interactive 360° virtual tour
          </p>
          <button 
            onClick={() => alert('Virtual tour coming soon! Experience our resort in immersive 360°.')}
            className="bg-white text-primary-600 font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl text-lg"
          >
            Start Virtual Tour
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-5xl hover:text-primary-400 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="mt-6 text-white text-center">
              <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg flex items-center justify-center gap-2 mb-6">
                <FaMapMarkerAlt className="text-accent-400" />
                {selectedImage.location}
              </p>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => handleLike(selectedImage.url)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    likedImages.has(selectedImage.url)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <FaHeart /> {likedImages.has(selectedImage.url) ? 'Liked' : 'Like'}
                </button>
                <button 
                  onClick={() => handleDownload(selectedImage.url, selectedImage.title)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <FaDownload /> Download
                </button>
                <button 
                  onClick={() => handleShare(selectedImage.title)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <FaShareAlt /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
