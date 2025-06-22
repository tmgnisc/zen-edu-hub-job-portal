import React from 'react';
import team1 from '../assets/aashish.jpeg';
import team2 from '../assets/our team 2.jpeg';
import team3 from '../assets/roshan kc.jpg';
import team4 from '../assets/teammem.jpeg';


const teamMembers = [
  {
    name: 'Binod Prasad Timalsina',
    title: 'Chairman',
    companies: [
      'Zen Career Hub HR Consultancy LLC',
      'Sukilo General trading LLC - Founder',
      'Sukilo Properties LLC - Founder',
    ],
    location: 'Dubai, United Arab Emirates',
    image: team4,
  },
  {
    name: 'Aashish Khokhali',
    title: 'CEO',
    companies: [
      'Zen Career Hub HR Consultancy LLC',
    ],
    location: 'Dubai, United Arab Emirates',
    image: team1,
  },
  {
    name: 'Kiran B K',
    title: 'Managing Partner, UAE',
    companies: [
      'ZEN Career Hub HR Consultancy LLC',
    ],
    location: 'Dubai, United Arab Emirates',
    image: team2,
  },
  {
    name: 'Roshan KC',
    title: 'Operation Head',
    companies: [
      'Zen Career Hub HR Consultancy LLC',
    ],
    location: 'Dubai, United Arab Emirates',
    image: team3,
  },
];

const TeamPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
    {/* Hero Section */}
    <header className="bg-[#283588] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
        <p className="max-w-2xl mx-auto text-blue-100 md:text-lg">
          Dedicated professionals driving ZEN Career Hub's mission and values.
        </p>
      </div>
    </header>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 mt-16 mb-20">
      <div className="relative flex flex-col gap-12 max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-10 top-0 bottom-0 w-1 bg-blue-100 z-0 hidden sm:block" style={{marginLeft: '16px'}}></div>
        {teamMembers.map((member, idx) => (
          <div key={member.name} className="relative flex items-center gap-8 z-10">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg bg-white mx-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex-1">
              <h3 className="text-2xl font-bold text-blue-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-1">{member.title}</p>
              <div className="text-sm text-gray-600 mb-2">
                {member.companies.map((c, i) => (
                  <div key={i}>{c}</div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">{member.location}</p>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  </div>
);

export default TeamPage; 