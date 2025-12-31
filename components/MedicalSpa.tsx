import { FaSpa, FaHeartbeat, FaLeaf, FaUserMd, FaWater, FaAward } from 'react-icons/fa';
import { GiMeditation, GiLotusFlower, GiHotSurface } from 'react-icons/gi';

const treatments = [
  {
    icon: FaSpa,
    title: 'Hydrotherapy',
    description: 'Therapeutic water treatments including mineral baths and aquatic massage',
    duration: '60-90 min',
    price: 'From $150'
  },
  {
    icon: FaHeartbeat,
    title: 'Medical Massage',
    description: 'Therapeutic massage by certified medical professionals',
    duration: '60-120 min',
    price: 'From $180'
  },
  {
    icon: GiHotSurface,
    title: 'Thermal Therapy',
    description: 'Hot stone therapy and infrared sauna treatments',
    duration: '45-60 min',
    price: 'From $120'
  },
  {
    icon: FaLeaf,
    title: 'Aromatherapy',
    description: 'Essential oil treatments for physical and emotional wellbeing',
    duration: '60 min',
    price: 'From $135'
  },
  {
    icon: GiMeditation,
    title: 'Stress Management',
    description: 'Mindfulness sessions and guided meditation therapy',
    duration: '45-60 min',
    price: 'From $95'
  },
  {
    icon: FaWater,
    title: 'Thalassotherapy',
    description: 'Seawater-based treatments and marine therapy',
    duration: '60-90 min',
    price: 'From $165'
  },
];

const specialists = [
  {
    name: 'Dr. Sarah Williams',
    title: 'Medical Director',
    specialty: 'Integrative Medicine',
    experience: '15+ years'
  },
  {
    name: 'Dr. Michael Chen',
    title: 'Wellness Physician',
    specialty: 'Sports Medicine',
    experience: '12+ years'
  },
  {
    name: 'Lisa Martinez',
    title: 'Chief Therapist',
    specialty: 'Physical Therapy',
    experience: '18+ years'
  },
];

export default function MedicalSpa() {
  return (
    <section id="medical-spa" className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-4">
            <FaSpa className="text-2xl" />
            <span className="uppercase tracking-wider text-sm">Medical Spa</span>
          </div>
          <h2 className="section-title">Healing Through Luxury</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Experience the perfect blend of medical expertise and spa luxury. Our medical spa offers evidence-based treatments in a serene, resort setting.
          </p>
        </div>

        {/* Featured Services */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl">
                  <treatment.icon />
                </div>
                <h3 className="text-2xl font-bold mb-3">{treatment.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{treatment.description}</p>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                  <span className="text-gray-500">{treatment.duration}</span>
                  <span className="font-bold text-teal-600">{treatment.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Professionals */}
        <div className="mb-20 bg-white rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-4">
              <FaUserMd className="text-2xl" />
              <span className="uppercase tracking-wider text-sm">Our Team</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">Medical Professionals</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our licensed medical team combines traditional medicine with holistic wellness approaches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialists.map((specialist, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                  {specialist.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-xl font-bold mb-2">{specialist.name}</h4>
                <p className="text-teal-600 font-semibold mb-1">{specialist.title}</p>
                <p className="text-gray-600 mb-2">{specialist.specialty}</p>
                <p className="text-sm text-gray-500">{specialist.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-4">
              <FaAward className="text-2xl" />
              <span className="uppercase tracking-wider text-sm">Why Choose Us</span>
            </div>
            <h3 className="text-4xl font-bold mb-6">Certified Excellence</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our medical spa is fully accredited and staffed by board-certified professionals who prioritize your health and wellbeing above all else.
            </p>
            <ul className="space-y-4">
              {[
                'Board-certified medical staff',
                'State-of-the-art facilities',
                'Personalized treatment plans',
                'FDA-approved technologies',
                'Complimentary consultations',
                'Comprehensive aftercare programs'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '15K+', label: 'Treatments Done' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '25+', label: 'Specialists' },
              { number: '50+', label: 'Treatment Types' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 text-white text-center shadow-lg"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <GiLotusFlower className="text-6xl mx-auto mb-6" />
          <h3 className="text-4xl font-bold mb-4">Begin Your Wellness Journey</h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book a complimentary consultation with our medical team to create your personalized treatment plan
          </p>
          <button className="bg-white text-teal-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
