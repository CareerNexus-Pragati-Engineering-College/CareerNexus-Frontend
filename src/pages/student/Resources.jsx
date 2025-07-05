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
            {(year || regulation || semester || branch) && (
              <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 shadow text-purple-700 font-medium w-fit">
                <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 text-lg transition">
                  <FaArrowLeft />
                </button>
                <span className="text-sm">
                  {year && `${year}st Year`}
                  {regulation && ` • ${regulation}`}
                  {semester && ` • Semester ${semester}`}
                  {branch && ` • ${branch}`}
                </span>
              </div>
            )}

            {!year && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-semibold mb-2">Select Year</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className="bg-gray-100 hover:bg-purple-100 px-6 py-3 rounded-xl font-medium shadow"
                    >
                      {y}st Year
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {year && !regulation && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-semibold mb-2">Select Regulation</h2>
                <div className="flex gap-4 flex-wrap">
                  {Object.keys(academicStructure).map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setRegulation(reg)}
                      className="bg-gray-100 hover:bg-purple-100 px-6 py-3 rounded-xl font-medium shadow"
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {regulation && !semester && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-semibold mb-2">Select Semester</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(academicStructure[regulation])
                    .filter((sem) => sem.startsWith(`${year}-`))
                    .map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setSemester(sem)}
                        className="bg-gray-100 hover:bg-purple-100 px-6 py-3 rounded-xl font-medium shadow"
                      >
                        Semester {sem}
                      </button>
                    ))}
                </div>
              </motion.div>
            )}

            {semester && !branch && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-semibold mb-2">Select Branch</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBranch(b)}
                      className="bg-gray-100 hover:bg-purple-100 px-6 py-3 rounded-xl font-medium shadow"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {branch && (
  <motion.div ref={subjectsRef} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
    <h2 className="text-2xl font-bold text-purple-700 mb-4">Subjects</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {Object.entries(getSubjects()).map(([subject, resources]) => (
        <motion.div
          key={subject}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-tr from-white via-purple-50 to-white border border-purple-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-bold text-purple-700 mb-3">{subject}</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            {resources.map((res, i) => (
              <li key={i} className="border-b border-gray-200 pb-4">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-600">
                    📄 <span className="font-medium">Description:</span> {res.description || "No description provided."}
                  </p>

                  <div className="flex flex-col md:flex-row gap-3">
                    <a
                      href={res.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-purple-700 font-semibold hover:underline"
                    >
                      <FaFilePdf className="text-red-500" /> View PDF
                    </a>
                    <a
                      href={res.pdf}
                      download
                      className="flex items-center gap-2 text-green-700 font-semibold hover:underline"
                    >
                      ⬇️ Download PDF
                    </a>
                  </div>

                  {res.videoLink && (
                    <a
                      href={res.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                    >
                      <FaYoutube className="text-red-600" /> Watch Video
                    </a>
                  )}
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => confirmDelete(i, subject)}
                    className="text-red-600 hover:text-red-700 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

          </>
        )}

        {category === "technical" && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold mb-2">Technical Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(technicalResources).map(([cat, topics]) => (
                <div key={cat} className="bg-gray-100 p-6 rounded-xl shadow">
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resources;