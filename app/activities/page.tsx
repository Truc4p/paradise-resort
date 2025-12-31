'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach, FaWater, FaBiking, FaYinYang, FaHiking, FaGolfBall, FaSpa, FaSwimmingPool, FaDumbbell, FaTableTennis, FaFish, FaCamera, FaChild, FaPaintBrush, FaGamepad, FaClock, FaMapMarkerAlt, FaUsers, FaStar, FaCalendarCheck, FaShip, FaMountain, FaHorse, FaVolleyballBall } from 'react-icons/fa';

const activities = [
  {
    icon: <FaUmbrellaBeach />,
    title: 'Private Beach Access',
    description: 'Exclusive pristine white sand beach with crystal-clear waters, beach cabanas, and complimentary towel service.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070',
    duration: 'All Day',
    price: 'Complimentary',
    difficulty: 'Easy',
    category: 'Beach',
  },
  {
    icon: <FaWater />,
    title: 'Water Sports Center',
    description: 'Kayaking, paddleboarding, jet skiing, windsurfing, and banana boat rides with professional instructors.',
    image: 'https://images.unsplash.com/photo-1483821838526-8d9756a6e1ed?q=80&w=2070',
    duration: '1-2 hours',
    price: 'From $25',
    difficulty: 'Moderate',
    category: 'Water Sports',
  },
  {
    icon: <FaYinYang />,
    title: 'Yoga & Meditation',
    description: 'Daily sunrise and sunset yoga sessions on the beach, guided meditation, and breathing workshops.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070',
    duration: '1 hour',
    price: 'Complimentary',
    difficulty: 'All Levels',
    category: 'Wellness',
  },
  {
    icon: <FaBiking />,
    title: 'Cycling Adventures',
    description: 'Explore scenic coastal routes, local villages, and hidden gems with our guided cycling tours.',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=2070',
    duration: '2-3 hours',
    price: 'From $35',
    difficulty: 'Moderate',
    category: 'Adventure',
  },
  {
    icon: <FaHiking />,
    title: 'Nature Trail Hiking',
    description: 'Guided hikes through tropical forests, mountain trails, and wildlife spotting excursions.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
    duration: '3-4 hours',
    price: 'From $45',
    difficulty: 'Challenging',
    category: 'Adventure',
  },
  {
    icon: <FaGolfBall />,
    title: 'Championship Golf',
    description: 'World-class 18-hole golf course with stunning ocean views and professional caddie service.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070',
    duration: '4-5 hours',
    price: 'From $120',
    difficulty: 'All Levels',
    category: 'Sports',
  },
  {
    icon: <FaFish />,
    title: 'Scuba Diving & Snorkeling',
    description: 'Explore vibrant coral reefs and marine life with PADI certified instructors and equipment provided.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
    duration: '2-3 hours',
    price: 'From $75',
    difficulty: 'Moderate',
    category: 'Water Sports',
  },
  {
    icon: <FaSpa />,
    title: 'Luxury Spa Treatments',
    description: 'Full-service spa with massages, facials, body treatments, and hydrotherapy pools.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070',
    duration: '1-3 hours',
    price: 'From $80',
    difficulty: 'Easy',
    category: 'Wellness',
  },
  {
    icon: <FaTableTennis />,
    title: 'Tennis Courts',
    description: 'Professional tennis courts with night lighting, equipment rental, and coaching available.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070',
    duration: '1 hour',
    price: 'From $30',
    difficulty: 'All Levels',
    category: 'Sports',
  },
];

const kidsActivities = [
  {
    icon: <FaChild />,
    title: 'Kids Club',
    age: 'Ages 4-12',
    description: 'Supervised fun with games, crafts, storytelling, and educational activities.',
    activities: ['Arts & Crafts', 'Beach Games', 'Treasure Hunts', 'Movie Time'],
  },
  {
    icon: <FaPaintBrush />,
    title: 'Creative Workshops',
    age: 'Ages 6-16',
    description: 'Painting, pottery, jewelry making, and other creative arts guided by professionals.',
    activities: ['Painting Classes', 'Pottery Making', 'Sand Art', 'Seashell Crafts'],
  },
  {
    icon: <FaSwimmingPool />,
    title: 'Swimming Lessons',
    age: 'Ages 5-14',
    description: 'Professional swim instruction for all skill levels in our heated pools.',
    activities: ['Beginner Classes', 'Advanced Swimming', 'Water Safety', 'Pool Games'],
  },
  {
    icon: <FaGamepad />,
    title: 'Teen Zone',
    age: 'Ages 13-17',
    description: 'Exclusive space with gaming consoles, sports tournaments, and social events.',
    activities: ['Video Games', 'Sports Competitions', 'DJ Nights', 'Beach Parties'],
  },
];

const seasonalActivities = [
  {
    season: 'Spring',
    title: 'Whale Watching Tours',
    description: 'Witness majestic humpback whales during their annual migration.',
    months: 'March - May',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
  },
  {
    season: 'Summer',
    title: 'Beach Volleyball Tournament',
    description: 'Join our weekly tournaments and compete with other guests.',
    months: 'June - August',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2070',
  },
  {
    season: 'Fall',
    title: 'Sunset Boat Cruises',
    description: 'Romantic evening cruises with live music and champagne.',
    months: 'September - November',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=2070',
  },
  {
    season: 'Winter',
    title: 'Stargazing Nights',
    description: 'Telescope viewing sessions with astronomy experts.',
    months: 'December - February',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2070',
  },
];

const excursions = [
  {
    title: 'Island Hopping Adventure',
    description: 'Visit three beautiful islands with snorkeling, lunch, and beach time.',
    price: '$150',
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
    highlights: ['3 Island Stops', 'Snorkeling Gear', 'Buffet Lunch', 'Hotel Transfer'],
  },
  {
    title: 'Mountain Safari Trek',
    description: 'Off-road adventure through mountains with waterfall swimming and local village visit.',
    price: '$95',
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
    highlights: ['4x4 Safari', 'Waterfall Visit', 'Local Lunch', 'Wildlife Spotting'],
  },
  {
    title: 'Sunset Sailing',
    description: 'Luxury catamaran cruise with open bar and appetizers.',
    price: '$120',
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
    highlights: ['Open Bar', 'Appetizers', 'Live Music', 'Swimming Stop'],
  },
  {
    title: 'Cultural Heritage Tour',
    description: 'Explore historic sites, local markets, and traditional ceremonies.',
    price: '$75',
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2070',
    highlights: ['Historic Sites', 'Local Market', 'Traditional Show', 'Guide Included'],
  },
];

export default function ActivitiesPage() {
  const handleBookActivity = (activityTitle: string) => {
    alert(`Booking for "${activityTitle}" coming soon! Please contact our concierge for reservations.`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Activities & Recreation</h1>
          <p className="text-xl md:text-2xl mb-6">Adventure, wellness, and endless entertainment await</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#activities" className="bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg font-bold transition-colors">
              Explore Activities
            </Link>
            <Link href="#schedule" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white px-8 py-3 rounded-lg font-bold transition-colors">
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Main Activities */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Activities</h2>
            <p className="section-subtitle">
              Discover endless possibilities for adventure and relaxation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {activity.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {activity.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl text-primary-600">{activity.icon}</div>
                    <h3 className="text-xl font-bold">{activity.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-primary-500" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-accent-500" />
                      <span>{activity.difficulty}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBookActivity(activity.title)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kids Activities */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Kids & Teen Programs</h2>
            <p className="section-subtitle">
              Supervised fun and educational activities for all ages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kidsActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                <div className="text-5xl text-primary-600 mb-4 flex justify-center">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{activity.title}</h3>
                <p className="text-accent-600 font-semibold text-center mb-4">{activity.age}</p>
                <p className="text-gray-600 mb-4 text-center">{activity.description}</p>
                <div className="space-y-2">
                  {activity.activities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary-500">★</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">All Programs Complimentary for Resort Guests</h3>
              <p className="text-gray-600 mb-4">Professional supervision by certified childcare staff</p>
              <Link href="/contact" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Get More Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Guided Excursions</h2>
            <p className="section-subtitle">
              Venture beyond the resort with our curated tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {excursions.map((excursion, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="md:flex">
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <Image
                      src={excursion.image}
                      alt={excursion.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-8">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold">{excursion.title}</h3>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary-600">{excursion.price}</p>
                        <p className="text-sm text-gray-500">{excursion.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{excursion.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {excursion.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-accent-500">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleBookActivity(excursion.title)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Activities */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Seasonal Experiences</h2>
            <p className="section-subtitle">
              Special activities available throughout the year
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasonalActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-primary-700">
                    {activity.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-accent-600 font-semibold text-sm mb-3">{activity.months}</p>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Daily Activity Schedule</h2>
            <p className="section-subtitle">Join our complimentary group activities</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Time</th>
                    <th className="px-6 py-4 text-left">Activity</th>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th className="px-6 py-4 text-left">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: '6:30 AM', activity: 'Beach Running Club', location: 'Beach', level: 'All Levels' },
                    { time: '7:00 AM', activity: 'Sunrise Yoga', location: 'Beach Pavilion', level: 'Beginner' },
                    { time: '8:00 AM', activity: 'Morning Swim', location: 'Main Pool', level: 'All Levels' },
                    { time: '9:00 AM', activity: 'Aqua Aerobics', location: 'Activity Pool', level: 'Moderate' },
                    { time: '10:00 AM', activity: 'Beach Volleyball', location: 'Beach Court', level: 'All Levels' },
                    { time: '11:00 AM', activity: 'Cooking Demonstration', location: 'Main Kitchen', level: 'All Levels' },
                    { time: '2:00 PM', activity: 'Snorkeling Tour', location: 'Dive Center', level: 'Beginner' },
                    { time: '3:00 PM', activity: 'Tennis Clinic', location: 'Tennis Courts', level: 'Intermediate' },
                    { time: '4:00 PM', activity: 'Sunset Cycling', location: 'Front Desk', level: 'Moderate' },
                    { time: '5:30 PM', activity: 'Sunset Yoga', location: 'Beach', level: 'All Levels' },
                    { time: '6:00 PM', activity: 'Wine Tasting', location: 'Sunset Lounge', level: 'Adults Only' },
                    { time: '8:00 PM', activity: 'Live Entertainment', location: 'Main Bar', level: 'All Ages' },
                  ].map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-primary-600">{item.time}</td>
                      <td className="px-6 py-4 font-medium">{item.activity}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-accent-500" />
                        {item.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {item.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              <FaCalendarCheck className="inline mr-2 text-primary-500" />
              Activities schedule may vary based on weather and availability
            </p>
            <Link href="/contact" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Request Activity Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Fitness Center */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6 flex justify-center">
              <FaDumbbell />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">State-of-the-Art Fitness Center</h2>
            <p className="text-xl text-gray-300 mb-8">
              24/7 access to modern equipment, personal trainers, and group fitness classes
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {['Cardio Equipment', 'Free Weights', 'Group Classes', 'Personal Training', 'Yoga Studio', 'Outdoor Track'].map((facility, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">{facility}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => alert('Personal training sessions can be booked at the fitness center or contact our concierge.')}
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book Personal Training
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay today and experience all our amazing activities and facilities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              View Rooms
            </Link>
            <Link href="/contact" className="border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-colors">
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
