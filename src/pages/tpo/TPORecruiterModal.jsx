import React from "react";
import { motion } from "framer-motion";
import { User, FileDown } from "lucide-react";

const TPORecruiterModal = ({ student, onClose }) => {
  if (!student) return null;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT

  return (
    <motion.div
      className="fixed inset-0 bg-[#2C225A]/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-outfit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl max-w-lg w-full relative overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>

        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between border-b border-violet-100 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-violet-100 to-indigo-100 p-3 rounded-2xl shadow-inner border border-violet-200 text-violet-600">
              <User size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2F2F5B] leading-tight flex items-center gap-2">
                {student.studentFirstName + " " + student.studentLastName}
              </h2>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                Applicant Profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-gray-700 bg-white/40">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-violet-50 shadow-sm">
              <p className="text-xs text-violet-500 font-bold uppercase tracking-wider mb-1">Branch</p>
              <p className="font-semibold text-gray-800 text-lg">{student.studentDepartment}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-violet-50 shadow-sm">
              <p className="text-xs text-violet-500 font-bold uppercase tracking-wider mb-1">Year</p>
              <p className="font-semibold text-gray-800 text-lg">{student.year}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-violet-50 shadow-sm">
            <p className="text-xs text-violet-500 font-bold uppercase tracking-wider mb-1">Email</p>
            <p className="font-medium text-gray-800 truncate">{student.studentEmail || "Not Available"}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-violet-50 shadow-sm">
            <p className="text-xs text-violet-500 font-bold uppercase tracking-wider mb-3">Profile Links</p>
            <div className="flex flex-wrap gap-2">
              {student.urls && JSON.parse(student.urls).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-600 font-semibold text-sm rounded-xl border border-violet-100 hover:bg-violet-600 hover:text-white transition-colors shadow-sm"
                >
                  {link.platform}
                </a>
              ))}
              {(!student.urls || JSON.parse(student.urls).length === 0) && (
                <p className="text-sm text-gray-500 italic">No links provided</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 font-semibold text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition shadow-sm"
          >
            Close
          </button>
          <a
            href={`${backendUrl}:${backendPort}/uploads/resumes${student.resume_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 transition transform hover:-translate-y-0.5"
          >
            <FileDown size={18} />
            View Resume
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TPORecruiterModal;
