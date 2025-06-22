"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  FileText,
  Mail,
  Briefcase,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Upload,
  User,
  Target,
  Award,
  Globe,
} from "lucide-react"
import { getJobs, getApplicationHistory } from '../api/apiService'
import Button from '../components/Button'

// Simple Card components
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-6 border-b ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

// Simple Badge component
const Badge = ({ children, variant, className, ...props }) => {
  const variantClasses = variant === "secondary"
    ? "bg-gray-100 text-gray-800"
    : variant === "outline"
    ? "border border-gray-300 text-gray-700"
    : "bg-blue-100 text-blue-800";
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${variantClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Simple Separator component
const Separator = ({ className, ...props }) => (
  <div className={`h-px bg-gray-200 my-4 ${className}`} {...props} />
);

const applyForJob = async (jobId, formData) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated. Please login to apply.');
  }

  const response = await fetch(`https://zenedu.everestwc.com/api/jobs/${jobId}/apply/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      // 'Content-Type': 'multipart/form-data', // fetch handles this automatically with FormData
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit application.');
  }

  return data;
}

export default function JobDetailsPage() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [coverLetterFile, setCoverLetterFile] = useState(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applyError, setApplyError] = useState("")
  const [applySuccess, setApplySuccess] = useState("")
  const [hasApplied, setHasApplied] = useState(false)
  const [applicantId, setApplicantId] = useState("")

  useEffect(() => {
    const userDataString = sessionStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData && userData.id) {
          setApplicantId(userData.id);
        }
      } catch (e) {
        console.error('Failed to parse user data from sessionStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Job Details
        const jobsData = await getJobs();
        const jobDetails = jobsData.find(job => job.id === parseInt(id));
        
        if (!jobDetails) {
          throw new Error('Job not found');
        }
        setJob(jobDetails);

        // Check if user is logged in and fetch application history
        const token = sessionStorage.getItem('token');
        const userDataString = sessionStorage.getItem('user');

        if (token && userDataString) {
          const applicationHistory = await getApplicationHistory(token);
          console.log('Application History:', applicationHistory);
          // Check if the current job ID exists in the user's application history by comparing job IDs
          const applied = applicationHistory.some(app => app.job && app.job.id === jobDetails.id); // Ensure app.job exists before accessing id
          setHasApplied(applied);
        }

      } catch (err) {
        setError(err.message);
        toast.error('Failed to load job details or application history');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, applicantId]); // Re-run when id or applicantId changes

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    setApplyError("")
    setApplySuccess("")

    if (job.resume_required && !resumeFile) {
      setApplyError("Resume is required for this position.")
      return
    }
    if (job.cover_letter_required && !coverLetterFile) {
      setApplyError("Cover letter is required for this position.")
      return
    }

    setApplyLoading(true)
    try {
      const formData = new FormData()
      if (job.resume_required && resumeFile) {
        formData.append("resume", resumeFile)
      }
      if (job.cover_letter_required && coverLetterFile) {
        formData.append("cover_letter", coverLetterFile)
      }
      formData.append("applicant_id", applicantId)
      formData.append("job_id", job.id)

      await applyForJob(job.id, formData)

      // On successful application
      setApplySuccess("Application submitted successfully!");
      toast.success("Application submitted successfully!");
      setHasApplied(true); // Mark as applied immediately
      setShowApplyModal(false); // Close the modal
      // Optionally navigate after a short delay or user action
      // navigate('/job-history'); // Removed automatic navigation for now

    } catch (err) {
      console.error('Apply job error details:', err);
      let errorMessage = "An error occurred while applying.";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response) { // Handle errors with a response from fetch
        // Try to parse JSON error response if available
        err.response.json().then(errorBody => {
          console.error('Apply job error body:', errorBody);
          errorMessage = errorBody.message || `Error: ${err.response.status} ${err.response.statusText}`;
          // Now we have the error message, re-evaluate the state
          // Check if the error indicates job already applied
          if (errorMessage.toLowerCase().includes('already applied')) { // *** ADJUST THIS STRING BASED ON YOUR CONSOLE OUTPUT ***
            errorMessage = "You have already applied for this job.";
            setHasApplied(true); // Mark as applied if the specific error indicates it
            setShowApplyModal(false); // Close modal if already applied
          }
          setApplyError(errorMessage);
          toast.error(errorMessage);
        }).catch(() => { // Fallback if response body is not JSON
          errorMessage = `Error: ${err.response.status} ${err.response.statusText}`;
          setApplyError(errorMessage);
          toast.error(errorMessage);
        });
        return; // Exit catch block after handling response
      }
      
      // Fallback for other types of errors (e.g., network errors)
      // Check if the error indicates job already applied (assuming the API provides a clear message for this)
      if (errorMessage.toLowerCase().includes('already applied')) { // *** ADJUST THIS STRING BASED ON YOUR CONSOLE OUTPUT ***
        errorMessage = "You have already applied for this job.";
        setHasApplied(true); // Mark as applied if the specific error indicates it
        setShowApplyModal(false); // Close modal if already applied
      }

      setApplyError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setApplyLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 pt-32">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/jobs")} className="w-full" variant="primary"><ArrowLeft className="h-4 w-4 mr-2" />Back to Jobs</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={job.company.company_logo || "/placeholder.svg"}
                alt={job.company.name}
                className="h-20 w-20 object-contain rounded-xl border-2 border-gray-100 bg-white p-2"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">{job.job_title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">{job.company.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>{job.company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span>{job.company.industry}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={() => {
                  if (!applicantId) {
                    navigate("/login")
                  } else {
                    setShowApplyModal(true)
                  }
                }}
                disabled={hasApplied}
                variant={hasApplied ? "secondary" : "primary"}
                className={`w-full md:w-auto ${hasApplied ? "!bg-green-600 !hover:bg-green-700 !text-white" : ""}`}
              >
                {hasApplied ? (
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5" />Applied</div>
                ) : (
                  <div className="flex items-center gap-2"><User className="h-5 w-5" />Apply Now</div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  About {job.company.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{job.company.description}</p>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose max-w-none text-gray-700 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Application Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${job.resume_required ? "bg-green-100" : "bg-gray-100"}`}>
                      <FileText className={`h-4 w-4 ${job.resume_required ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-medium">Resume</p>
                      <p className="text-sm text-gray-600">{job.resume_required ? "Required" : "Optional"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${job.cover_letter_required ? "bg-green-100" : "bg-gray-100"}`}>
                      <Mail className={`h-4 w-4 ${job.cover_letter_required ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-medium">Cover Letter</p>
                      <p className="text-sm text-gray-600">{job.cover_letter_required ? "Required" : "Optional"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Salary</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {job.salary_range}/Month
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Job Type</span>
                  </div>
                  <Badge variant="outline">
                    {job.job_type ? job.job_type.replace("_", " ").toUpperCase() : 'Not Specified'}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Vacancies</span>
                  </div>
                  <Badge variant="outline">
                    {job.number_of_people} Position{job.number_of_people > 1 ? "s" : ""}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Deadline</span>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Category</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {job.job_category.name}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Application Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Application Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{job.applicant_count}</div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Industry</p>
                  <p className="font-medium">{job.company.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="font-medium">{job.company.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Company Size</p>
                  <p className="font-medium">HR Consultancy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Apply for {job.job_title}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowApplyModal(false)} className="h-8 w-8 p-0">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {job.resume_required && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Resume (PDF only) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        required={!!job.resume_required}
                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                )}

                {job.cover_letter_required && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Cover Letter (PDF only) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
                        required={!!job.cover_letter_required}
                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                )}

                {applyError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <XCircle className="h-4 w-4" />
                    {applyError}
                  </div>
                )}

                {applySuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                    {applySuccess}
                  </div>
                )}

                <Button type="submit" disabled={applyLoading} variant="primary" className="w-full flex items-center justify-center gap-2">
                  {applyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
