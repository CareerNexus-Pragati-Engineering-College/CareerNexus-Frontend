import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { motion } from "framer-motion";
import requestApi from "../../services/request";

const RecruiterCodingRoundResults = () => {
  const { userId, jobId, assessmentId } = useParams();
  const navigate = useNavigate();

  const [passed, setPassed] = useState([]);
  const [failed, setFailed] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [passedRes, failedRes, pendingRes] = await Promise.all([
          requestApi.get(`/exam/recruiter/round/${assessmentId}/students/passed`),
          requestApi.get(`/exam/recruiter/round/${assessmentId}/students/failed`),
          requestApi.get(`/exam/recruiter/round/${assessmentId}/students/pending`),
        ]);

        setPassed(passedRes.data || []);
        setFailed(failedRes.data || []);
        setPending(pendingRes.data || []);
      } catch (err) {
        console.error("Failed to load coding round results", err);
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      fetchData();
    }
  }, [assessmentId]);

  const handleBack = () => {
    navigate(`/recruiter/${userId}/recruitment-process/${jobId}`);
  };

  const renderRow = (item, index) => (
    <tr key={index} className="border-b last:border-b-0 text-xs md:text-sm">
      <td className="px-3 py-2 font-mono text-gray-700">{item.studentUserId}</td>
      <td className="px-3 py-2">{item.studentEmail}</td>
      <td className="px-3 py-2">{item.applicationStatus || "PENDING"}</td>
      <td className="px-3 py-2">{item.score != null ? `${item.score} / ${item.totalQuestions}` : "-"}</td>
    </tr>
  );

  return (
    <>
      <NavbarRecruiterDashboard />
      <div className="pt-20 px-4 pb-12 min-h-screen bg-white font-poppins text-gray-800">
        {/* Back button */}
        <div className="max-w-6xl mx-auto mb-6">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-purple-300 rounded-full text-gray-500 hover:text-purple-600 shadow-sm hover:shadow transition-all duration-300 text-sm"
          >
            <FaArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Recruitment Process
          </button>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-700">
              Coding Round Results
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Job ID: {jobId} • Assessment ID: {assessmentId}. This round is treated as an elimination round: students who do not meet minimum marks are rejected.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading results...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Passed */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm col-span-1 md:col-span-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaCheckCircle className="text-green-600" />
                  <h2 className="font-semibold text-sm md:text-base text-green-700">
                    Passed (Qualified)
                  </h2>
                  <span className="ml-auto text-xs font-bold bg-white/70 text-green-700 px-2 py-0.5 rounded-full">
                    {passed.length}
                  </span>
                </div>
                {passed.length === 0 ? (
                  <p className="text-xs text-gray-500">No students have qualified yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase text-gray-400">
                        <tr>
                          <th className="px-3 py-1">Student</th>
                          <th className="px-3 py-1">Email</th>
                          <th className="px-3 py-1">Application</th>
                          <th className="px-3 py-1">Score</th>
                        </tr>
                      </thead>
                      <tbody>{passed.map(renderRow)}</tbody>
                    </table>
                  </div>
                )}
              </motion.div>

              {/* Failed */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm col-span-1 md:col-span-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaTimesCircle className="text-red-600" />
                  <h2 className="font-semibold text-sm md:text-base text-red-700">
                    Failed (Eliminated)
                  </h2>
                  <span className="ml-auto text-xs font-bold bg-white/70 text-red-700 px-2 py-0.5 rounded-full">
                    {failed.length}
                  </span>
                </div>
                {failed.length === 0 ? (
                  <p className="text-xs text-gray-500">No students have been eliminated in this round.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase text-gray-400">
                        <tr>
                          <th className="px-3 py-1">Student</th>
                          <th className="px-3 py-1">Email</th>
                          <th className="px-3 py-1">Application</th>
                          <th className="px-3 py-1">Score</th>
                        </tr>
                      </thead>
                      <tbody>{failed.map(renderRow)}</tbody>
                    </table>
                  </div>
                )}
              </motion.div>

              {/* Pending */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm col-span-1 md:col-span-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaHourglassHalf className="text-yellow-600" />
                  <h2 className="font-semibold text-sm md:text-base text-yellow-700">
                    Pending (Not Attempted)
                  </h2>
                  <span className="ml-auto text-xs font-bold bg-white/70 text-yellow-700 px-2 py-0.5 rounded-full">
                    {pending.length}
                  </span>
                </div>
                {pending.length === 0 ? (
                  <p className="text-xs text-gray-500">No pending students for this round.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase text-gray-400">
                        <tr>
                          <th className="px-3 py-1">Student</th>
                          <th className="px-3 py-1">Email</th>
                          <th className="px-3 py-1">Application</th>
                          <th className="px-3 py-1">Score</th>
                        </tr>
                      </thead>
                      <tbody>{pending.map(renderRow)}</tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecruiterCodingRoundResults;

