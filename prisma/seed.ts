import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.roomAmenity.deleteMany();
  await prisma.roomInventory.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.room.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialOffer.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // Create amenities
  console.log('✨ Creating amenities...');
  const amenities = await Promise.all([
    prisma.amenity.create({ data: { name: 'WiFi', icon: 'FaWifi', description: 'High-speed internet' } }),
    prisma.amenity.create({ data: { name: 'Air Conditioning', icon: 'FaSnowflake', description: 'Climate control' } }),
    prisma.amenity.create({ data: { name: 'Mini Bar', icon: 'FaGlassMartini', description: 'Stocked mini bar' } }),
    prisma.amenity.create({ data: { name: 'Ocean View', icon: 'FaWater', description: 'Beautiful ocean view' } }),
    prisma.amenity.create({ data: { name: 'Balcony', icon: 'FaDoorOpen', description: 'Private balcony' } }),
    prisma.amenity.create({ data: { name: 'Room Service', icon: 'FaConciergeBell', description: '24/7 room service' } }),
    prisma.amenity.create({ data: { name: 'TV', icon: 'FaTv', description: 'Smart TV' } }),
    prisma.amenity.create({ data: { name: 'Safe', icon: 'FaLock', description: 'In-room safe' } }),
    prisma.amenity.create({ data: { name: 'Jacuzzi', icon: 'FaHotTub', description: 'Private jacuzzi' } }),
    prisma.amenity.create({ data: { name: 'King Bed', icon: 'FaBed', description: 'Luxury king bed' } }),
  ]);

  // Create rooms
  console.log('🏨 Creating rooms...');
  const deluxeRoom = await prisma.room.create({
    data: {
      name: 'Deluxe Ocean View',
      slug: 'deluxe-ocean-view',
      description: 'Spacious room with stunning ocean views, perfect for couples seeking luxury and comfort.',
      basePrice: 250,
      maxGuests: 2,
      size: 35,
      bedType: 'King',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      ],
    },
  });

  const familySuite = await prisma.room.create({
    data: {
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Large suite with separate living area, ideal for families with children.',
      basePrice: 400,
      maxGuests: 4,
      size: 60,
      bedType: 'King + Twin',
      imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      ],
    },
  });

  const presidentialSuite = await prisma.room.create({
    data: {
      name: 'Presidential Suite',
      slug: 'presidential-suite',
      description: 'Ultimate luxury with private jacuzzi, panoramic ocean views, and exclusive amenities.',
      basePrice: 800,
      maxGuests: 4,
      size: 100,
      bedType: 'King',
      imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
      images: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      ],
    },
  });

  const gardenView = await prisma.room.create({
    data: {
      name: 'Garden View Room',
      slug: 'garden-view-room',
      description: 'Cozy room overlooking our tropical gardens, perfect for a peaceful retreat.',
      basePrice: 180,
      maxGuests: 2,
      size: 28,
      bedType: 'Queen',
      imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
      ],
    },
  });

  // Link amenities to rooms
  console.log('🔗 Linking amenities to rooms...');
  
  // Deluxe Room amenities
  await Promise.all([
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[0].id } }), // WiFi
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[1].id } }), // AC
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[2].id } }), // Mini Bar
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[3].id } }), // Ocean View
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[4].id } }), // Balcony
    prisma.roomAmenity.create({ data: { roomId: deluxeRoom.id, amenityId: amenities[6].id } }), // TV
  ]);

  // Family Suite amenities
  await Promise.all([
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[0].id } }),
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[1].id } }),
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[2].id } }),
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[5].id } }), // Room Service
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[6].id } }),
    prisma.roomAmenity.create({ data: { roomId: familySuite.id, amenityId: amenities[7].id } }), // Safe
  ]);

  // Presidential Suite amenities (all)
  await Promise.all(
    amenities.map((amenity) =>
      prisma.roomAmenity.create({ data: { roomId: presidentialSuite.id, amenityId: amenity.id } })
    )
  );

  // Garden View amenities
  await Promise.all([
    prisma.roomAmenity.create({ data: { roomId: gardenView.id, amenityId: amenities[0].id } }),
    prisma.roomAmenity.create({ data: { roomId: gardenView.id, amenityId: amenities[1].id } }),
    prisma.roomAmenity.create({ data: { roomId: gardenView.id, amenityId: amenities[6].id } }),
  ]);

  // Create room inventory
  console.log('📦 Creating room inventory...');
  await Promise.all([
    prisma.roomInventory.create({ data: { roomId: deluxeRoom.id, totalRooms: 10 } }),
    prisma.roomInventory.create({ data: { roomId: familySuite.id, totalRooms: 5 } }),
    prisma.roomInventory.create({ data: { roomId: presidentialSuite.id, totalRooms: 2 } }),
    prisma.roomInventory.create({ data: { roomId: gardenView.id, totalRooms: 8 } }),
  ]);

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const users = await Promise.all([
    // Admin user
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@resort.com',
        phone: '+1000000000',
        password: adminPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1987654321',
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Michael Johnson',
        email: 'michael@example.com',
        phone: '+1122334455',
        password: hashedPassword,
      },
    }),
  ]);

  // Create sample bookings
  console.log('📅 Creating sample bookings...');
  const booking1 = await prisma.booking.create({
    data: {
      userId: users[1].id, // John Doe
      roomId: deluxeRoom.id,
      checkIn: new Date('2025-02-01'),
      checkOut: new Date('2025-02-05'),
      numberOfGuests: 2,
      totalPrice: 1000,
      status: 'CONFIRMED',
      specialRequests: 'Late check-in preferred',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: users[2].id, // Jane Smith
      roomId: presidentialSuite.id,
      checkIn: new Date('2025-03-15'),
      checkOut: new Date('2025-03-20'),
      numberOfGuests: 2,
      totalPrice: 4000,
      status: 'CONFIRMED',
      specialRequests: 'Honeymoon package',
    },
  });

  // Create payments for bookings
  console.log('💳 Creating payments...');
  await Promise.all([
    prisma.payment.create({
      data: {
        bookingId: booking1.id,
        amount: 1000,
        paymentMethod: 'credit_card',
        paymentStatus: 'COMPLETED',
        transactionId: 'TXN001',
        paidAt: new Date(),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: booking2.id,
        amount: 4000,
        paymentMethod: 'credit_card',
        paymentStatus: 'COMPLETED',
        transactionId: 'TXN002',
        paidAt: new Date(),
      },
    }),
  ]);

  // Create reviews
  console.log('⭐ Creating reviews...');
  await Promise.all([
    prisma.review.create({
      data: {
        userId: users[1].id, // John Doe
        rating: 5,
        title: 'Amazing Experience!',
        comment: 'The resort exceeded all our expectations. The staff was incredibly friendly and the room was spotless.',
        isPublic: true,
      },
    }),
    prisma.review.create({
      data: {
        userId: users[2].id, // Jane Smith
        rating: 5,
        title: 'Perfect Honeymoon',
        comment: 'We had an unforgettable honeymoon at this resort. The presidential suite was absolutely stunning!',
        isPublic: true,
      },
    }),
    prisma.review.create({
      data: {
        userId: users[3].id, // Michael Johnson
        rating: 4,
        title: 'Great Stay',
        comment: 'Beautiful location and excellent facilities. Would definitely come back.',
        isPublic: true,
      },
    }),
  ]);

  // Create special offers
  console.log('🎁 Creating special offers...');
  await Promise.all([
    prisma.specialOffer.create({
      data: {
        title: 'Early Bird Special',
        description: 'Book 30 days in advance and save 20%',
        discount: 20,
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        code: 'EARLY20',
        isActive: true,
      },
    }),
    prisma.specialOffer.create({
      data: {
        title: 'Summer Paradise',
        description: 'Stay 4 nights, pay for 3',
        discount: 25,
        validFrom: new Date('2025-06-01'),
        validUntil: new Date('2025-08-31'),
        code: 'SUMMER25',
        isActive: true,
      },
    }),
    prisma.specialOffer.create({
      data: {
        title: 'Honeymoon Package',
        description: 'Special romance package with champagne and spa treatments',
        discount: 15,
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        code: 'HONEYMOON15',
        isActive: true,
      },
    }),
  ]);

  // Create newsletter subscribers
  console.log('📧 Creating newsletter subscribers...');
  await Promise.all([
    prisma.newsletterSubscriber.create({
      data: { email: 'subscriber1@example.com' },
    }),
    prisma.newsletterSubscriber.create({
      data: { email: 'subscriber2@example.com' },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log(`
  📊 Summary:
  - ${amenities.length} amenities created
  - 4 rooms created
  - ${users.length} users created
  - 2 bookings created
  - 2 payments created
  - 3 reviews created
  - 3 special offers created
  - 2 newsletter subscribers created
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
