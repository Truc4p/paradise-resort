import { FaUmbrellaBeach, FaWater, FaBiking, FaYinYang, FaHiking, FaGolfBall } from 'react-icons/fa';

const activities = [
  {
    icon: FaUmbrellaBeach,
    title: 'Private Beach',
    description: 'Exclusive access to pristine white sand beach with water sports'
  },
  {
    icon: FaWater,
    title: 'Water Sports',
    description: 'Kayaking, paddleboarding, snorkeling, and diving'
  },
  {
    icon: FaYinYang,
    title: 'Yoga & Wellness',
    description: 'Daily yoga sessions and meditation by the ocean'
  },
  {
    icon: FaBiking,
    title: 'Cycling Tours',
    description: 'Explore local villages and scenic coastal routes'
  },
  {
    icon: FaHiking,
    title: 'Nature Trails',
    description: 'Guided hikes through tropical forests and mountains'
  },
  {
    icon: FaGolfBall,
    title: 'Golf Course',
    description: 'Championship 18-hole course with ocean views'
  },
];

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Experiences & Activities</h2>
          <p className="section-subtitle">
            Discover endless possibilities for adventure and relaxation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <activity.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
