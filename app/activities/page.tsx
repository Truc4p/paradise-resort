import Activities from "@/components/Activities";

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
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
          <p className="text-xl md:text-2xl">Adventure and relaxation await</p>
        </div>
      </section>

      <Activities />

      {/* Schedule Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Daily Activity Schedule</h2>
            <p className="section-subtitle">Join our complimentary group activities</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Time</th>
                    <th className="px-6 py-4 text-left">Activity</th>
                    <th className="px-6 py-4 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: '7:00 AM', activity: 'Sunrise Yoga', location: 'Beach' },
                    { time: '9:00 AM', activity: 'Aqua Aerobics', location: 'Pool' },
                    { time: '11:00 AM', activity: 'Cooking Class', location: 'Kitchen' },
                    { time: '2:00 PM', activity: 'Snorkeling Tour', location: 'Dive Center' },
                    { time: '4:00 PM', activity: 'Sunset Cycling', location: 'Front Desk' },
                    { time: '6:00 PM', activity: 'Wine Tasting', location: 'Sunset Lounge' },
                  ].map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-primary-600">{item.time}</td>
                      <td className="px-6 py-4">{item.activity}</td>
                      <td className="px-6 py-4 text-gray-600">{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
