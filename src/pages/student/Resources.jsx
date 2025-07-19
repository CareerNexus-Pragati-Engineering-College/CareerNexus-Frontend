import React, { useState, useRef } from "react";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import {
  FaBook,
  FaCode,
  FaFilePdf,
  FaYoutube,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { academicStructure } from "./academicData";
import ShareResource from "./ShareResource";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const branches = [
  "CSE", "CSE-AI", "CSE-DS", "CSE-AIML", "CSE-CS", "CSE-IT",
  "ECE", "EEE", "CIVIL", "MECH",
];

const Resources = () => {
  const [category, setCategory] = useState(null);
  const [year, setYear] = useState("");
  const [regulation, setRegulation] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [sharedResources, setSharedResources] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const subjectsRef = useRef(null);

  const handleShareResource = (data) => {
    const completeData = {
      ...data,
      year,
      regulation,
      semester,
      branch,
      pdf: URL.createObjectURL(data.pdfFile),
    };
    setSharedResources((prev) => [...prev, completeData]);
    setShowShareForm(false);

    setTimeout(() => {
      if (subjectsRef.current) {
        subjectsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  };

  const getSubjects = () => {
    const filtered = sharedResources.filter(
      (res) =>
        res.year === year &&
        res.regulation === regulation &&
        res.semester === semester &&
        res.branch === branch
    );
    const subjects = {};
    filtered.forEach((res) => {
      if (!subjects[res.subject]) subjects[res.subject] = [];
      subjects[res.subject].push(res);
    });
    return subjects;
  };

  const handleBack = () => {
    if (branch) setBranch("");
    else if (semester) setSemester("");
    else if (regulation) setRegulation("");
    else if (year) setYear("");
    else setCategory(null);
  };

  const getPageHeading = () => {
    if (category === "academic") return "Academic Resources";
    if (category === "technical") return "Technical Resources";
    return "Student Resources";
  };

  const confirmDelete = (index, subject) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="bg-white p-6 rounded-xl shadow-xl border max-w-sm w-full mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold text-red-600">Confirm Deletion</h2>
          <p className="text-gray-700">Are you sure you want to delete this resource?</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                const updated = sharedResources.filter(
                  (_, idx) => !(idx === index && _.subject === subject)
                );
                setSharedResources(updated);
                onClose();
              }}
            >
              Yes, Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      overlayClassName: "bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50",
    });
  };

  const technicalResources = {
    "Programming Languages": ["C", "Java", "Python"],
    "Web Development": ["HTML", "CSS", "React", "Node.js"],
    DSA: ["Stacks", "Queues", "Trees", "Graphs"],
  };

  const filteredTechnicalResources = Object.entries(technicalResources).reduce(
    (acc, [category, topics]) => {
      const filtered = topics.filter((topic) =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-10 px-4 text-gray-900 font-poppins">
      <NavbarStudentDashboard />

      <div className="max-w-6xl mx-auto space-y-10 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-purple-600">{getPageHeading()}</h1>
          {category === "academic" && (
            <button
              onClick={() => setShowShareForm(!showShareForm)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              Share Resources
            </button>
          )}
        </div>

        {showShareForm && category === "academic" && (
          <ShareResource
            onShare={handleShareResource}
            onClose={() => setShowShareForm(false)}
          />
        )}

        {!category && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setCategory("academic")}
              className="bg-white border-2 border-purple-500 rounded-2xl px-8 py-12 flex flex-col items-center justify-center shadow-md transition text-purple-700 hover:bg-purple-50"
            >
              <FaBook size={40} className="mb-4" />
              <span className="text-2xl font-semibold">Academic Resources</span>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Syllabus-wise subjects, PDFs, videos & more
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setCategory("technical")}
              className="bg-white border-2 border-indigo-500 rounded-2xl px-8 py-12 flex flex-col items-center justify-center shadow-md transition text-indigo-700 hover:bg-indigo-50"
            >
              <FaCode size={40} className="mb-4" />
              <span className="text-2xl font-semibold">Technical Resources</span>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Programming, DSA, web dev, videos, notes
              </p>
            </motion.button>
          </motion.div>
        )}

        {category === "academic" && (
          <>
            {/* keep your existing academic logic unchanged here */}
          </>
        )}

        {category === "technical" && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold mb-4">Technical Topics</h2>

            {/* Search Bar */}
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search technical topics..."
                className="w-full max-w-2xl mb-6 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Vertically aligned, same-width cards */}
            <div className="flex flex-col items-center gap-6">
              {Object.entries(filteredTechnicalResources).map(([cat, topics]) => (
                <div
                  key={cat}
                  className="bg-gray-100 p-6 rounded-xl shadow w-full max-w-2xl"
                >
                  <h3 className="text-lg font-bold text-purple-600 mb-2">{cat}</h3>
                  <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                    {topics.map((topic) => (
                      <li key={topic}>
                        <a href="#" className="text-blue-600 hover:underline">
                          {topic} Resources
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {Object.keys(filteredTechnicalResources).length === 0 && (
                <p className="text-gray-500 italic">No topics match your search.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resources;
