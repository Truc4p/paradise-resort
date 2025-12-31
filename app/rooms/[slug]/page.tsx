import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const roomsData: { [key: string]: any } = {
  'deluxe-ocean-view': {
    name: 'Deluxe Ocean View',
    slug: 'deluxe-ocean-view',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    ],
    price: '$250',
    priceUnit: 'per night',
    description: 'Spacious room with stunning ocean views and private balcony. Perfect for couples or solo travelers seeking tranquility.',
    fullDescription: 'Immerse yourself in luxury with our Deluxe Ocean View rooms. Each room is thoughtfully designed with modern elegance and features floor-to-ceiling windows that offer breathtaking views of the pristine ocean. Wake up to the sound of waves and enjoy your morning coffee on your private balcony while watching the sunrise over the turquoise waters.',
    features: ['King Bed', 'Ocean View', 'Private Balcony', '45 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Coffee Maker', 'Minibar', 'Luxury Bathroom', 'Air Conditioning', 'Room Service', 'Safe', 'Bathrobe & Slippers', 'Hairdryer'],
    maxGuests: 2,
    bedType: 'King',
    size: '45 m²',
  },
  'premium-suite': {
    name: 'Premium Suite',
    slug: 'premium-suite',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    ],
    price: '$450',
    priceUnit: 'per night',
    description: 'Luxurious suite with separate living area and panoramic views. Ideal for extended stays or special occasions.',
    fullDescription: 'Experience the epitome of luxury in our Premium Suite. This spacious suite features a separate living room, perfect for relaxation or entertaining. The panoramic ocean views from multiple vantage points create an immersive coastal experience. Whether you\'re celebrating a special occasion or seeking an extended retreat, this suite offers unmatched comfort and style.',
    features: ['King Bed', 'Living Room', 'Ocean View Balcony', '75 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Espresso Machine', 'Premium Minibar', 'Spa Bathroom', 'Workspace', 'Room Service', 'Safe', 'Bathrobe & Slippers', 'Hairdryer', 'Sofa Bed', 'Dining Area'],
    maxGuests: 3,
    bedType: 'King',
    size: '75 m²',
  },
  'presidential-villa': {
    name: 'Presidential Villa',
    slug: 'presidential-villa',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    ],
    price: '$850',
    priceUnit: 'per night',
    description: 'Ultimate luxury with private pool and beachfront access. Experience unparalleled comfort and exclusive amenities.',
    fullDescription: 'Indulge in the ultimate luxury experience with our Presidential Villa. This exclusive accommodation features two spacious bedrooms, a private infinity pool, and direct beachfront access. Perfect for families or groups, the villa includes a full kitchen, multiple bathrooms, and personalized butler service. Enjoy unparalleled privacy and comfort in this crown jewel of our resort.',
    features: ['2 Bedrooms', 'Private Pool', 'Beach Access', '150 m²'],
    amenities: ['Free WiFi', 'Smart TVs', 'Full Kitchen', 'Premium Minibar', 'Jacuzzi', 'Butler Service', '24/7 Room Service', 'Safe', 'Bathrobes & Slippers', 'Hairdryer', 'Washing Machine', 'Dining Area', 'BBQ Grill', 'Outdoor Shower'],
    maxGuests: 6,
    bedType: '2 King Beds',
    size: '150 m²',
  },
};

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsData[slug];

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Image Gallery */}
      <section className="relative h-[70vh] bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          <div className="relative h-full">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <div className="relative">
              <Image
                src={room.images[1]}
                alt={`${room.name} view 2`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src={room.images[2]}
                alt={`${room.name} view 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Details */}
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <Link href="/rooms" className="text-primary-600 hover:text-primary-700 font-medium">
                    ← Back to Rooms
                  </Link>
                </div>

                <h1 className="text-5xl font-bold mb-6">{room.name}</h1>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {room.price}
                  </span>
                  <span className="text-xl text-gray-600">{room.priceUnit}</span>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {room.fullDescription}
                </p>

                {/* Features */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Room Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Max Guests</p>
                      <p className="text-2xl font-bold text-primary-600">{room.maxGuests}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Bed Type</p>
                      <p className="text-lg font-semibold text-gray-900">{room.bedType}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Size</p>
                      <p className="text-lg font-semibold text-gray-900">{room.size}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">View</p>
                      <p className="text-lg font-semibold text-gray-900">Ocean</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.amenities.map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                        <div className="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Room Highlights</h3>
                  <div className="flex flex-wrap gap-3">
                    {room.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-white text-primary-700 px-4 py-2 rounded-full text-sm font-semibold border border-primary-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">{room.price}</span>
                      <span className="text-gray-600">/ night</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Max Guests</span>
                      <span className="font-semibold">{room.maxGuests} persons</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Bed Type</span>
                      <span className="font-semibold">{room.bedType}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Room Size</span>
                      <span className="font-semibold">{room.size}</span>
                    </div>
                  </div>

                  <Link
                    href={`/contact?room=${encodeURIComponent(room.name)}`}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center"
                  >
                    Book This Room
                  </Link>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
