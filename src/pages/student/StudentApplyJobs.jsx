import React, { useState, useEffect} from "react";

import { useParams } from "react-router-dom"; // userid ni url lo use pettadaniki - itlu mee guna bhai

import {
  FaBookmark,
  FaRegBookmark,
  FaBuilding,
  FaClock,
  FaMapMarkerAlt,
  FaBolt,
  FaLaptopCode,
  FaCheckCircle,
} from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import QuickApplyModal from "./QuickApplyModal"; // adjust the path if needed


const dummyJobs = [
  {
    id: 1,
    title: "Software Trainee",
    company: "Tech Tammina",
    experience: "0-1 Years",
    location: "Hyderabad",
    posted: "1 month ago",
    applicants: "500+",
    type: "Information Technology",
    saved: false,
    applied: false,
    description:
      "Responsible for developing and testing web applications under senior guidance. Great opportunity to learn full-stack technologies.",
    inRole:
      "Assist in backend development using Java and Spring Boot. Collaborate with UI team and perform integration testing.",
    qualifications:
      "B.Tech in CSE or IT. Solid understanding of Java and HTML/CSS. Good problem-solving skills.",
    skills: ["Java", "Spring Boot", "HTML", "CSS", "SQL"],
    recruitment:
      "Coding Round > Technical Interview > HR Interview",
    moreInfo: {
      role: "Trainee Developer",
      industry: "IT Services",
      function: "Development",
      type: "Full-time",
    },
    about:
      "Tech Tammina is a growing tech firm providing custom software solutions globally.",
    technologies: ["Java", "Spring Boot", "MySQL"],
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Pixelwave",
    experience: "0-1 Years",
    location: "Remote",
    posted: "2 weeks ago",
    applicants: "200+",
    type: "Web Development",
    saved: false,
    applied: false,
    description:
      "Design, build and test modern front-end user interfaces using React and Tailwind CSS.",
    inRole:
      "Work closely with product teams to implement UI components and animations.",
    qualifications:
      "Pursuing/completed Bachelor's in CS. Strong React.js and CSS fundamentals.",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    recruitment: "Portfolio Review > Interview",
    moreInfo: {
      role: "Frontend Intern",
      industry: "Tech Startup",
      function: "UI Development",
      type: "Internship",
    },
    about:
      "Pixelwave is a product-based startup building modern SaaS interfaces for tech companies.",
    technologies: ["React", "Tailwind", "Git", "Figma"],
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataBridge Analytics",
    experience: "1-2 Years",
    location: "Bangalore",
    posted: "3 days ago",
    applicants: "700+",
    type: "Analytics",
    saved: false,
    applied: false,
    description:
      "Analyze data trends, visualize reports and support decision-making with data-driven insights.",
    inRole:
      "Use SQL, Excel, and Power BI to create dashboards and summarize metrics.",
    qualifications:
      "BSc/BE/B.Tech in Math/CS. Strong SQL, problem solving, and communication skills.",
    skills: ["SQL", "Excel", "Power BI", "Python"],
    recruitment:
      "Assessment > Technical Round > Final Interview",
    moreInfo: {
      role: "Data Analyst",
      industry: "Analytics",
      function: "Data Science",
      type: "Full-time",
    },
    about:
      "DataBridge is an analytics solutions company working with top FMCG and Retail clients.",
    technologies: ["SQL", "Power BI", "Python"],
  },
  {
    id: 4,
    title: "Cloud DevOps Engineer - Intern",
    company: "CloudForge",
    experience: "0-1 Years",
    location: "Pune",
    posted: "5 days ago",
    applicants: "300+",
    type: "DevOps",
    saved: false,
    applied: false,
    description:
      "Work with cloud infra teams to automate and monitor cloud-native deployments.",
    inRole:
      "Use AWS, Docker, and CI/CD tools to maintain dev pipelines and monitor systems.",
    qualifications:
      "Understanding of Linux, Docker and cloud platforms preferred.",
    skills: ["AWS", "Docker", "GitHub Actions"],
    recruitment: "Online Test > Technical Task > Interview",
    moreInfo: {
      role: "DevOps Intern",
      industry: "Cloud Services",
      function: "DevOps",
      type: "Internship",
    },
    about:
      "CloudForge is a leading cloud infrastructure consultancy and managed services provider.",
    technologies: ["AWS", "Terraform", "Docker"],
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "DesignSprint",
    experience: "1-3 Years",
    location: "Gurgaon",
    posted: "1 week ago",
    applicants: "100+",
    type: "Design",
    saved: false,
    applied: false,
    description:
      "Design intuitive and accessible web/mobile interfaces using Figma and design principles.",
    inRole:
      "Translate product requirements into wireframes, prototypes, and final designs.",
    qualifications:
      "Bachelor’s in Design or relevant field. Portfolio is a must.",
    skills: ["Figma", "User Research", "Adobe XD", "Prototyping"],
    recruitment:
      "Portfolio Shortlist > Design Challenge > Interview",
    moreInfo: {
      role: "UX Designer",
      industry: "Product Design",
      function: "Design",
      type: "Full-time",
    },
    about:
      "DesignSprint is a creative studio focused on building human-centric digital experiences.",
    technologies: ["Figma", "Miro", "Adobe Suite"],
  },
];


const StudentApplyJobs = () => {
  const [selectedTab, setSelectedTab] = useState("Recommended");
  const [jobs, setJobs] = useState(dummyJobs);
  const [selectedJob, setSelectedJob] = useState(dummyJobs[0]);
  const [filters, setFilters] = useState({ location: "", experience: "", role: "" });
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
const { userId } = useParams(); // url params nunchi useris id ni theeskunta - itlu mee guna bhai
  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem("jobPreferences"));
    if (savedPrefs) setFilters(savedPrefs);

    const storedJobs = JSON.parse(localStorage.getItem("jobs"));
    if (storedJobs) setJobs(storedJobs);
  }, []);

  const toggleSave = (id) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, saved: !job.saved } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem("jobPreferences", JSON.stringify(filters));
    setIsPrefModalOpen(false);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location ? job.location === filters.location : true) &&
      (filters.experience ? job.experience === filters.experience : true) &&
      (filters.role ? job.title === filters.role : true) &&
      (selectedTab === "Saved" ? job.saved : true)
    );
  });

  return (
    <>
      <NavbarStudentDashboard />

      <div className="min-h-screen bg-white text-gray-900 font-poppins px-4 pt-24 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="px-1 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] md:text-[18px] font-semibold text-gray-800">Jobs for you</h2>
              <button
                onClick={() => setIsPrefModalOpen(true)}
                className="text-purple-700 text-sm font-medium flex items-center gap-1"
              >
                Edit preferences <LuPenLine size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm px-1">
            {["Recommended", "Saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-2 border-b-2 font-medium ${
                  selectedTab === tab
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500 hover:text-purple-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left - Job List */}
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-hide">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`cursor-pointer border p-4 rounded-xl flex gap-4 items-start transition shadow-sm hover:shadow-md ${
                      selectedJob?.id === job.id ? "border-purple-600" : "border-gray-200"
                    }`}
                  >
                    <div className="bg-purple-100 text-purple-700 rounded-lg p-2">
                      <FaBuilding size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                      <p className="text-xs text-gray-500">{job.company}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt /> {job.location}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Posted {job.posted}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(job.id);
                      }}
                    >
                      {job.saved ? (
                        <FaBookmark className="text-purple-600" />
                      ) : (
                        <FaRegBookmark className="text-gray-400 hover:text-purple-600" />
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  {selectedTab === "Saved"
                    ? "No saved jobs yet."
                    : "No jobs found matching the selected filters."}
                </p>
              )}
            </div>

            {/* Right - Job Details */}
            {selectedJob && (
              <div className="bg-gray-50 p-6 rounded-xl shadow space-y-5 overflow-y-auto max-h-[75vh] border border-purple-300 scrollbar-hide">
                <div className="flex gap-4 items-center">
                  <div className="bg-purple-100 text-purple-700 rounded-lg p-2">
                    <FaBuilding size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                    <p className="text-sm text-gray-600">{selectedJob.company}</p>
                    <p className="text-xs text-gray-400">
                      Posted {selectedJob.posted} • {selectedJob.applicants} applicants
                    </p>
                  </div>
                </div>

                {selectedJob.applied ? (
                  <button
                    disabled
                    className="bg-green-100 text-green-700 py-2 px-4 rounded-full text-sm font-semibold flex items-center gap-2 cursor-default"
                  >
                    ✅ Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <FaBolt /> Quick Apply
                  </button>
                )}

                {/* Job Description Blocks */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-purple-600" />
                    <span>{selectedJob.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLaptopCode className="text-purple-600" />
                    <span>{selectedJob.type}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Job Description</h4>
                  <p className="text-sm text-gray-700">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">In this role you will...</h4>
                  <p className="text-sm text-gray-700">{selectedJob.inRole}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Qualifications & Skills</h4>
                  <p className="text-sm text-gray-700">{selectedJob.qualifications}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Recruitment Process</h4>
                  <p className="text-sm text-gray-700">{selectedJob.recruitment}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">About the Company</h4>
                  <p className="text-sm text-gray-700">{selectedJob.about}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">More Info</h4>
                  <p className="text-sm text-gray-700">
                    Role: {selectedJob.moreInfo.role}<br />
                    Industry: {selectedJob.moreInfo.industry}<br />
                    Function: {selectedJob.moreInfo.function}<br />
                    Job Type: {selectedJob.moreInfo.type}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {isPrefModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Set Your Job Preferences</h3>
            <div className="space-y-4">
              {["location", "experience", "role"].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">
                    {key === "role" ? "Preferred Role" : `Preferred ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  </label>
                  <select
                    name={key}
                    value={filters[key]}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="">Any</option>
                    {[...new Set(jobs.map((j) => key === "role" ? j.title : j[key]))].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsPrefModalOpen(false)} className="text-gray-600 hover:text-gray-800 text-sm">
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 text-sm rounded"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Apply Modal */}
      {showApplyModal && (
        <QuickApplyModal
          job={selectedJob}
          onClose={() => setShowApplyModal(false)}
          onApply={(updatedJob) => {
            const updatedJobs = jobs.map((job) =>
              job.id === updatedJob.id ? { ...updatedJob, applied: true } : job
            );
            setJobs(updatedJobs);
            localStorage.setItem("jobs", JSON.stringify(updatedJobs));
            setShowApplyModal(false);
          }}
        />
      )}
    </>
  );
};

export default StudentApplyJobs;