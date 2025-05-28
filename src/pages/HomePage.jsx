import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, Globe, MapPin, CheckCircle, Users, Briefcase, Award, ChevronRight, Star, DollarSign } from "lucide-react"
import team1 from '../assets/aashish.jpeg'
import team2 from '../assets/our team 2.jpeg'
import team3 from '../assets/roshan kc.jpg'
// Import the getJobs function from your apiService
import { getJobs } from '../api/apiService';

// Import the new TrendingJobs component
// import TrendingJobs from '../components/TrendingJobs'; // Removing this import

// Replace Next.js Image with regular img tag
const Image = ({ src, alt, width, height, className, fill }) => {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

// Simple Button component to replace the UI library button
const Button = ({ children, className, variant, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg transition-colors";
  const variantClasses = variant === "outline" 
    ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50" 
    : "bg-blue-600  hover:bg-blue-700";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Utility function to strip HTML tags from a string (copied from JobsPage.jsx)
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// Define a few background colors to cycle through for visual variety
const cardBackgroundColors = [
  'bg-green-100', // Similar to the first card in the image
  'bg-blue-100',  // Similar to the second and third cards
  'bg-purple-100',
  'bg-yellow-100',
];

export default function HomePage() {
  // Reinstate state and effect for trending jobs
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [errorTrending, setErrorTrending] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingJobs = async () => {
      try {
        const data = await getJobs();
        // Filter active jobs and take the first 4
        const activeJobs = data.filter(job => {
           const deadlineDate = new Date(job.deadline);
           const today = new Date();
           today.setHours(0, 0, 0, 0);
           return job.is_active && deadlineDate >= today;
        });
        setTrendingJobs(activeJobs.slice(0, 3));
      } catch (err) {
        setErrorTrending(err.message);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingJobs();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden mt-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
          <Image
            src="https://placehold.co/1920x1080/f8fafc/e2e8f0?text="
            alt="Background Pattern"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>
        <div className="container mx-auto px-20 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Empowering <span className="text-blue-600">Global Talent</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mt-4">Bridging Opportunities</h2>
              </div>
              <p className="text-xl text-slate-600 max-w-lg">
                ZEN Career Hub is a premier human capital solutions provider headquartered in Dubai, connecting
                skilled professionals with global opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs">
                  <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                    Explore Jobs
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
               
                <div className="text-slate-700">
                  
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1653669486884-48b9938fe446?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                  alt="ZEN Career Hub"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Trending Jobs Section - Moved back to HomePage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Trending Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:underline flex items-center font-medium">
              See All Jobs <ChevronRight className="ml-1 w-5 h-5"/>
            </Link>
          </div>

          {loadingTrending && <p className="text-center">Loading trending jobs...</p>}
          {errorTrending && <p className="text-center text-red-500">Error loading trending jobs: {errorTrending}</p>}
          {!loadingTrending && !errorTrending && trendingJobs.length === 0 && (
            <p className="text-center text-gray-600 text-lg">No trending jobs available at the moment.</p>
          )}
          {!loadingTrending && !errorTrending && trendingJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className={`${cardBackgroundColors[index % cardBackgroundColors.length]} rounded-2xl p-6 relative overflow-hidden cursor-pointer`}
                  onClick={() => handleJobClick(job.id)}
                >
                   {/* Company Logo, Job Title, Company Name */}
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.job_title}</h3>
                       <p className="text-gray-600 text-sm">{job.company.name}</p>
                     </div>
                    {job.company.company_logo && (
                       <img 
                         src={job.company.company_logo}
                         alt={job.company.name}
                         className="w-16 h-16 object-contain ml-4 rounded-md"
                       />
                    )}
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{stripHtml(job.job_description)}</p>

                  {/* Location and Type */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{job.company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                       {/* Using Briefcase icon based on API data and previous card design */}
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      <span>{job.job_type}</span>
                    </div>
                  </div>

                  {/* Salary and Apply Button */}
                  <div className="flex justify-between items-center mt-4">
                    <div>
                       {/* Using DollarSign icon and salary_range from API */}
                      <span className="text-xl font-bold text-gray-800 flex items-baseline">
                        {job.salary_range}
                         <span className="text-gray-600 text-sm ml-1">/mo</span>
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                         e.stopPropagation(); // Prevent card click from navigating
                         handleJobClick(job.id);
                      }}
                      className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors duration-200 shadow-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    

      {/* <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-slate-500 font-medium">Trusted by leading companies worldwide</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={`https://placehold.co/200x80/e2e8f0/64748b?text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={200}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Section with Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute top-1/4 -left-5 w-72 h-72 bg-blue-50 rounded-full filter blur-3xl opacity-70 z-0"></div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486775-75ddc200933c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                    alt="Team"
                    width={600}
                    height={800}
                    className="rounded-2xl shadow-lg h-80 object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1653669486789-72a1124a0a26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
                    alt="Office"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-lg h-48 object-cover"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486960-9d4c6f3fcbdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
                    alt="Meeting"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-lg h-48 object-cover"
                  />
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1676651178807-d5b7ddfdf2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
                    alt="Consulting"
                    width={600}
                    height={800}
                    className="rounded-2xl shadow-lg h-80 object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Premier HR Consultancy in Dubai</h2>
                <div className="w-20 h-1 bg-blue-500"></div>
              </div>
              <p className="text-lg text-slate-600">
                ZEN Career Hub HR Consultancies is a premier human capital solutions provider headquartered in Dubai,
                UAE. Under the visionary leadership of CEO Mr. Aashish Khokhali, we are committed to delivering ethical,
                efficient, and customized HR solutions.
              </p>
              <p className="text-lg text-slate-600">
                Our strategic alliance with Zen Edu Hub in Nepal enhances our reach and effectiveness in sourcing
                top-tier talent from South Asia.
              </p>
              <Link to="/about">
                <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center mt-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Vision & Mission</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full opacity-50"></div>
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Image
                    src="https://placehold.co/200/2563eb/ffffff?text=V"
                    alt="Vision"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
                <p className="text-lg text-slate-600 mb-4">
                  To be a globally recognized HR consultancy that empowers individuals and organizations through
                  innovative and ethical talent solutions.
                </p>
                <div className="mt-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486884-48b9938fe446?w=800&auto=format&fit=crop&q=60"
                    alt="Vision Image"
                    width={800}
                    height={320}
                    className="rounded-xl shadow-md w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full opacity-50"></div>
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Image
                    src="https://placehold.co/200/2563eb/ffffff?text=M"
                    alt="Mission"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
                <ul className="space-y-4 text-slate-600 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-lg">
                      To provide seamless recruitment and immigration services that facilitate career growth and
                      organizational success.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-lg">
                      To uphold the highest standards of integrity, transparency, and professionalism in all our
                      engagements.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-lg">
                      To foster long-term partnerships by understanding and addressing the unique needs of our clients
                      and candidates.
                    </p>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60"
                    alt="Mission Image"
                    width={800}
                    height={320}
                    className="rounded-xl shadow-md w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We offer comprehensive HR solutions tailored to meet the unique needs of both employers and job seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1698047681452-08eba22d0c64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcnNlYXMlMjBoaXJpbmd8ZW58MHx8MHx8fDA%3D"
                  alt="Overseas Hiring"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Overseas Hiring Solutions</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                We connect employers with qualified candidates across various industries, ensuring a perfect fit for
                roles in the Gulf region and beyond.
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1565688527174-775059ac429c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3ZlcnNlYXMlMjBoaXJpbmd8ZW58MHx8MHx8fDA%3D"
                  alt="Local Placements"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Local & International Placements</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                Our extensive network enables us to place professionals in positions that align with their skills and
                career aspirations, both within the UAE and internationally.
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1565688335719-d0297c355556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG92ZXJzZWFzJTIwaGlyaW5nfGVufDB8fDB8fHww"
                  alt="Immigration Services"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Immigration Services</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                We offer comprehensive immigration support, including visa processing and legal compliance, to
                facilitate smooth transitions for expatriates.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXhlY3V0aXZlJTIwc2VhcmNofGVufDB8fDB8fHww"
                  alt="Executive Search"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Talent Acquisition & Executive Search</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                Our dedicated team specializes in sourcing and placing top-tier executives and specialized professionals
                to drive organizational growth.
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uc3VsdGFudHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="HR Consultancy"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">HR Consultancy Services</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                We provide strategic HR consulting, including policy development, performance management, and
                organizational structuring, to optimize workforce efficiency.
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmclMjBhbmQlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Training & Development"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Training & Development</h3>
                  <div className="w-12 h-1 bg-blue-500"></div>
                </div>
              </div>
              <p className="text-slate-600">
                Our tailored training programs enhance employee skills and performance, contributing to overall
                organizational success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-10"></div>
        <div className="container mx-auto px-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Z E N Career Hub?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Strategic Location</h3>
              <p className="text-slate-300">
                Situated in Dubai, a global business hub, we are ideally positioned to serve a diverse clientele.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Global Network</h3>
              <p className="text-slate-300">
                Our partnership with Zen Edu Hub in Nepal and connections across South Asia expand our talent pool.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Customized Solutions</h3>
              <p className="text-slate-300">
                We tailor our services to meet the specific needs of each client, ensuring optimal outcomes.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ethical Practices</h3>
              <p className="text-slate-300">
                We adhere to the highest ethical standards, ensuring transparency and integrity in all our operations.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Experienced Leadership</h3>
              <p className="text-slate-300">
                Our leadership team brings a wealth of experience and insight into the HR and recruitment industry.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-slate-300">
                Our track record of successful placements and satisfied clients speaks to our effectiveness and
                reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
              <p className="text-xl text-blue-100">
                Partner with Z E N Career Hub for all your recruitment and HR needs. Let us help you find the perfect
                talent for your organization.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link to="/contact">
                <Button className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-center">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Z E N Career Hub.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 shadow">
                <img src={team1} alt="Aashish Khokhali" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Aashish Khokhali</h3>
              <p className="text-blue-600 font-medium">Group CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 shadow">
                <img src={team2} alt="Kiran BK" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Kiran BK</h3>
              <p className="text-blue-600 font-medium">Managing Partner</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 shadow">
                <img src={team3} alt="Roshan KC" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Roshan KC</h3>
              <p className="text-blue-600 font-medium">Operation Head</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
} 