import React from "react";
import { motion } from "framer-motion";
import { User, FileDown } from "lucide-react";

const TPORecruiterModal = ({ student, onClose }) => {
  if (!student) return null;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT 

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <User className="text-white" size={28} />
            </div>
            <h2 className="text-xl font-bold text-white">{student.studentFirstName + " " + student.studentLastName}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-gray-700">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <p className="mb-2">
              <span className="font-semibold">Branch:</span> {student.studentDepartment}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Year:</span> {student.year}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {student.studentEmail || "Not Available"}
            </p>
            <div>
              <span className="font-semibold">Profile Links:</span>{" "}

              <div className="flex flex-wrap gap-2 mt-1">
                {JSON.parse(student.urls).map((link, index) => (
                  <div
                    key={index}
                    className="text-[#6B4ECF] px-2.5 py-1 rounded-md flex items-center gap-2 text-sm"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {link.platform}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
           
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
          >
            <FileDown size={18} />
            <a
              href={`${backendUrl}:${backendPort}/uploads/resumes${student.resume_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              View Resume
            </a>
           
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TPORecruiterModal;
