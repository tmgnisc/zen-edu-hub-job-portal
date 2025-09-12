import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Shield, Lock, Eye, Database, Users, Globe, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At ZEN Edu Hub Job Portal, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
            
            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-3">
                    When you create an account, apply for jobs, or use our services, we may collect:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Professional information including work history, education, and skills</li>
                    <li>Resume/CV files and cover letters</li>
                    <li>Profile information and preferences</li>
                    <li>Job application history and interactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                  <p className="text-gray-700 mb-3">
                    We automatically collect certain information when you use our platform:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Search queries and job preferences</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Create and manage your user account</li>
                  <li>Match you with relevant job opportunities</li>
                  <li>Process and track your job applications</li>
                  <li>Send you job alerts and notifications</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Information Sharing</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>With Employers:</strong> When you apply for a job, we share your application materials with the hiring company</li>
                  <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers and infrastructure</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response procedures</li>
                </ul>
                <p className="text-gray-700">
                  However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Restriction:</strong> Limit how we process your information</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
                <p className="text-gray-700">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Cookies and Tracking Technologies</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements</li>
                </ul>
                <p className="text-gray-700">
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Services</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our platform may contain links to third-party websites or integrate with external services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Children's Privacy</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>
              </div>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Changes to This Policy</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  We may update this privacy policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending you an email notification</li>
                  <li>Displaying a notice on our platform</li>
                </ul>
                <p className="text-gray-700">
                  Your continued use of our services after any changes indicates your acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Email: privacy@zeneduhub.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Phone: +1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Address: 123 Education Street, Tech City, TC 12345</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-4">
                  We will respond to your inquiry within 30 days of receipt.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 text-center">
                This privacy policy is effective as of the date listed above and applies to all users of the ZEN Edu Hub Job Portal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;

