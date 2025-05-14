import React from 'react';

const offers = [
  {
    img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=400',
    number: '01',
    title: 'Job Recommendation',
    desc: 'Personalized job matches tailored to your skills and preferences',
  },
  {
    img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400',
    number: '02',
    title: 'Create & Build Portfolio',
    desc: 'Showcase your expertise with professional portfolio design',
  },
  {
    img: 'https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&w=400',
    number: '03',
    title: 'Career Consultation',
    desc: 'Receive expert advice to navigate your career path',
  },
];

const WhatWeOffer = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-4">
        What We <span className="text-blue-600">Offer</span>
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore the Benefits and Services We Provide to Enhance Your Job Search<br />
        and Career Success
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {offers.map((offer, idx) => (
          <div key={offer.title} className="flex flex-col items-start w-full max-w-xs">
            <img src={offer.img} alt={offer.title} className="rounded-lg w-full h-56 object-cover mb-6" />
            <div className="border-l-4 border-blue-600 pl-4">
              <span className="text-2xl font-bold text-gray-400 align-top">{offer.number}</span>
              <span className="block text-xl font-bold text-black mb-1 ml-2 inline">{offer.title}</span>
              <p className="text-gray-600 mt-1">{offer.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatWeOffer; 