import { FaHeartbeat, FaAppleAlt, FaDumbbell, FaBed, FaBrain, FaAward } from 'react-icons/fa';
import { GiMeditation, GiNightSleep, GiHealthNormal } from 'react-icons/gi';
import { MdSpa, MdFitnessCenter } from 'react-icons/md';

const programs = [
  {
    icon: FaHeartbeat,
    title: 'Cardiac Wellness',
    description: 'Comprehensive cardiovascular health program with monitoring and exercise',
    duration: '7-14 days',
    includes: ['Medical assessment', 'Customized exercise plan', 'Nutrition counseling', 'Stress management']
  },
  {
    icon: FaAppleAlt,
    title: 'Detox & Nutrition',
    description: 'Cleansing program with organic meals and nutritional guidance',
    duration: '5-10 days',
    includes: ['Dietary consultation', 'Detox treatments', 'Cooking classes', 'Supplement plan']
  },
  {
    icon: FaDumbbell,
    title: 'Weight Management',
    description: 'Sustainable weight loss through fitness, nutrition, and behavior modification',
    duration: '14-21 days',
    includes: ['Personal training', 'Meal planning', 'Body composition analysis', 'Lifestyle coaching']
  },
  {
    icon: GiNightSleep,
    title: 'Sleep Recovery',
    description: 'Comprehensive program to address sleep disorders and improve rest quality',
    duration: '7-10 days',
    includes: ['Sleep study', 'Relaxation therapy', 'Circadian optimization', 'Sleep hygiene training']
  },
  {
    icon: FaBrain,
    title: 'Mental Wellness',
    description: 'Holistic approach to mental health including therapy and mindfulness',
    duration: '10-14 days',
    includes: ['Psychology sessions', 'Meditation training', 'Art therapy', 'Nature therapy']
  },
  {
    icon: GiHealthNormal,
    title: 'Longevity Program',
    description: 'Anti-aging and vitality enhancement through integrated wellness',
    duration: '14-21 days',
    includes: ['Health screening', 'IV therapy', 'Hormone balance', 'Cellular health protocols']
  },
];

const facilities = [
  {
    icon: MdFitnessCenter,
    title: 'Medical Fitness Center',
    description: 'State-of-the-art gym with rehabilitation equipment and personal trainers'
  },
  {
    icon: MdSpa,
    title: 'Hydrotherapy Pool',
    description: 'Therapeutic pools with underwater massage and mineral-enriched water'
  },
  {
    icon: GiMeditation,
    title: 'Meditation Pavilion',
    description: 'Serene spaces designed for mindfulness practice and yoga'
  },
  {
    icon: FaBed,
    title: 'Wellness Suites',
    description: 'Specially designed rooms with air purification and circadian lighting'
  },
];

export default function HealthResort() {
  return (
    <section id="health-resort" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-4">
            <FaHeartbeat className="text-2xl animate-pulse" />
            <span className="uppercase tracking-wider text-sm">Health Resort</span>
          </div>
          <h2 className="section-title">Transform Your Health</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Immerse yourself in a comprehensive health restoration experience. Our medical team designs personalized programs to address your specific health goals.
          </p>
        </div>

        {/* Wellness Programs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Wellness Programs</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Medically supervised programs tailored to your health objectives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl">
                  <program.icon />
                </div>
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <span className="text-sm font-semibold text-emerald-600">Duration: {program.duration}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Includes:</div>
                  {program.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Resort Facilities */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">World-Class Facilities</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a complete health transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                  <facility.icon />
                </div>
                <h4 className="text-lg font-bold mb-2">{facility.title}</h4>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Benefits */}
        <div className="bg-white rounded-3xl p-12 shadow-xl mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-4">
                <FaAward className="text-2xl" />
                <span className="uppercase tracking-wider text-sm">Evidence-Based Results</span>
              </div>
              <h3 className="text-4xl font-bold mb-6">Proven Health Outcomes</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our programs are based on the latest medical research and have helped thousands achieve lasting health improvements.
              </p>
              <div className="space-y-4">
                {[
                  { metric: 'Blood Pressure', improvement: '15-25% reduction' },
                  { metric: 'Stress Levels', improvement: '40% decrease' },
                  { metric: 'Sleep Quality', improvement: '60% improvement' },
                  { metric: 'Energy Levels', improvement: '45% increase' },
                  { metric: 'Weight Management', improvement: '8-12 lbs average loss' },
                  { metric: 'Overall Wellbeing', improvement: '85% satisfaction rate' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <span className="font-semibold text-gray-700">{item.metric}</span>
                    <span className="text-emerald-600 font-bold">{item.improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {[
                    'Complete medical assessment',
                    'Daily doctor consultations',
                    'Personalized treatment plan',
                    'Healthy gourmet meals',
                    'Fitness & wellness activities',
                    'Educational workshops',
                    'Relaxation therapies',
                    'Follow-up care program',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-90">Medical Support</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-1">100%</div>
                  <div className="text-sm opacity-90">Personalized</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">"</div>
            <blockquote className="text-2xl font-light mb-8 leading-relaxed">
              The health resort program completely transformed my life. The medical team's expertise combined with the resort's peaceful environment gave me the tools to finally achieve my health goals.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Jennifer Davis</div>
                <div className="text-white/80">Weight Management Program Graduate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
            <h4 className="text-2xl font-bold mb-4">Start Your Journey</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Schedule a complimentary health assessment with our medical team to discuss your goals and create a personalized program.
            </p>
            <button className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg">
              Book Health Assessment
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-10 shadow-xl text-white">
            <h4 className="text-2xl font-bold mb-4">Download Our Brochure</h4>
            <p className="mb-6 leading-relaxed text-white/90">
              Get detailed information about all our health programs, facilities, and pricing.
            </p>
            <button className="w-full bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
