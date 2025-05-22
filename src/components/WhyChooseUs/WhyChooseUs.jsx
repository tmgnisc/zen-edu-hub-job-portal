import React from 'react';

const features = [
  {
    title: "Strategic Location",
    description: "Situated in Dubai, a global business hub, we are ideally positioned to serve a diverse clientele.",
    icon: "📍"
  },
  {
    title: "Global Network",
    description: "Our partnership with Zen Edu Hub in Nepal and connections across South Asia expand our talent pool.",
    icon: "🌐"
  },
  {
    title: "Customized Solutions",
    description: "We tailor our services to meet the specific needs of each client, ensuring optimal outcomes.",
    icon: "⚡"
  },
  {
    title: "Ethical Practices",
    description: "We adhere to the highest ethical standards, ensuring transparency and integrity in all our operations.",
    icon: "✨"
  },
  {
    title: "Experienced Leadership",
    description: "Our leadership team brings a wealth of experience and insight into the HR and recruitment industry.",
    icon: "👥"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Z E N Career Hub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in career growth and recruitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                To be a globally recognized HR consultancy that empowers individuals and organizations through innovative and ethical talent solutions.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  To provide seamless recruitment and immigration services that facilitate career growth and organizational success.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  To uphold the highest standards of integrity, transparency, and professionalism in all our engagements.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  To foster long-term partnerships by understanding and addressing the unique needs of our clients and candidates.
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://placehold.co/800x600/1e40af/ffffff?text=Leadership"
              alt="Leadership"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-blue-600">Mr. Aashish Khokhali</div>
              <div className="text-gray-600">CEO, Z E N Career Hub</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 