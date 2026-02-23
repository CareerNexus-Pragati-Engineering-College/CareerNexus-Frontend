import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import requestApi from "../../services/request";
import toast from "react-hot-toast";
import NavbarTpoDashboard from "../../components/NavbarTPODashboard";
import { FaPlus, FaTrash, FaCheck, FaArrowLeft } from "react-icons/fa";

const TPOCodingAssessmentForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [assessmentDetails, setAssessmentDetails] = useState({
    assessmentName: "",
    jobPostId: "",
    startTime: "",
    endTime: "",
  });

  const [questions, setQuestions] = useState([
    {
      title: "",
      description: "",
      constraints: "",
      points: 10,
      testCases: [{ input: "", expectedOutput: "", isHidden: false, marks: 5 }],
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // General Handlers
  const handleDetailsChange = (e) => {
    setAssessmentDetails({
      ...assessmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Question Handlers
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        description: "",
        constraints: "",
        points: 10,
        testCases: [
          { input: "", expectedOutput: "", isHidden: false, marks: 5 },
        ],
      },
    ]);
  };

  const handleRemoveQuestion = (qIndex) => {
    const updated = questions.filter((_, i) => i !== qIndex);
    setQuestions(updated);
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };

  // Test Case Handlers
  const handleAddTestCase = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].testCases.push({
      input: "",
      expectedOutput: "",
      isHidden: false,
      marks: 5,
    });
    setQuestions(updated);
  };

  const handleRemoveTestCase = (qIndex, tcIndex) => {
    const updated = [...questions];
    updated[qIndex].testCases = updated[qIndex].testCases.filter(
      (_, i) => i !== tcIndex,
    );
    setQuestions(updated);
  };

  const handleTestCaseChange = (qIndex, tcIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].testCases[tcIndex][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...assessmentDetails,
      jobPostId: assessmentDetails.jobPostId
        ? parseInt(assessmentDetails.jobPostId)
        : null,
      questions: questions,
      mode: "PRACTICE",
      minMarks: null,
    };

    try {
      const res = await requestApi.post("/coding-exam/tpo/create", payload);
      toast.success("Coding Assessment Created Successfully!");
      navigate(-1);
    } catch (err) {
      toast.error(err.response?.data || "Failed to create assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] via-[#ECEAFE] to-[#D6E6FD] text-[#2C225A] font-outfit">
      <NavbarTpoDashboard />
      <div className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>

          <h1 className="text-4xl font-extrabold text-[#2F2F5B] mb-2 tracking-tight">
            Create Coding Practice Test
          </h1>
          <p className="text-[#5C5C80] mb-8 text-lg">
            Define practice coding challenges and execution test cases. These
            tests are for practice only and do not affect any job application.
          </p>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 1. Assessment Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-violet-700 border-b border-violet-200 pb-2">
                1. Practice Test Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Practice Test Name
                  </label>
                  <input
                    required
                    placeholder="e.g. DSA Coding Practice Set 1"
                    name="assessmentName"
                    onChange={handleDetailsChange}
                    value={assessmentDetails.assessmentName}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Post ID (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="Leave blank for general practice"
                    name="jobPostId"
                    onChange={handleDetailsChange}
                    value={assessmentDetails.jobPostId}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    required
                    type="datetime-local"
                    name="startTime"
                    onChange={handleDetailsChange}
                    value={assessmentDetails.startTime}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    required
                    type="datetime-local"
                    name="endTime"
                    onChange={handleDetailsChange}
                    value={assessmentDetails.endTime}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
                  />
                </div>
              </div>
            </div>

            {/* 2. Questions Array */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-violet-200 pb-2">
                <h2 className="text-2xl font-bold text-violet-700">
                  2. Practice Coding Challenges
                </h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-lg font-bold hover:bg-violet-200 transition"
                >
                  <FaPlus /> Add Question
                </button>
              </div>

              {questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100 relative"
                >
                  <div className="absolute top-4 right-4">
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="text-red-400 hover:text-red-600 transition p-2 bg-red-50 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-[#2F2F5B] mb-4">
                    Challenge {qIndex + 1}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          required
                          placeholder="e.g. Two Sum"
                          value={q.title}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "title",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Max Points
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={q.points}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "points",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Description / Problem Statement (Markdown/HTML
                        supported)
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={q.description}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "description",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 resize-none font-mono text-sm"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Constraints
                      </label>
                      <textarea
                        rows="2"
                        placeholder="e.g. 2 <= nums.length <= 10^4"
                        value={q.constraints}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "constraints",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 resize-none font-mono text-sm"
                      ></textarea>
                    </div>

                    {/* Test Cases Nested Array */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-indigo-700">
                          Execution Test Cases
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddTestCase(qIndex)}
                          className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 flex items-center gap-1"
                        >
                          <FaPlus size={10} /> Add Test Case
                        </button>
                      </div>

                      <div className="space-y-4">
                        {q.testCases.map((tc, tcIndex) => (
                          <div
                            key={tcIndex}
                            className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200"
                          >
                            <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-600 mb-1">
                                Standard Input (stdin)
                              </label>
                              <textarea
                                required
                                rows="2"
                                placeholder="Input string..."
                                value={tc.input}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    qIndex,
                                    tcIndex,
                                    "input",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono"
                              ></textarea>
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-600 mb-1">
                                Expected Output (stdout)
                              </label>
                              <textarea
                                required
                                rows="2"
                                placeholder="Expected exact output..."
                                value={tc.expectedOutput}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    qIndex,
                                    tcIndex,
                                    "expectedOutput",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono"
                              ></textarea>
                            </div>
                            <div className="w-24">
                              <label className="block text-xs font-bold text-gray-600 mb-1">
                                Marks
                              </label>
                              <input
                                required
                                type="number"
                                min="0"
                                value={tc.marks}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    qIndex,
                                    tcIndex,
                                    "marks",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div className="w-24 flex flex-col items-center">
                              <label className="block text-xs font-bold text-gray-600 mb-2">
                                Hidden?
                              </label>
                              <input
                                type="checkbox"
                                checked={tc.isHidden}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    qIndex,
                                    tcIndex,
                                    "isHidden",
                                    e.target.checked,
                                  )
                                }
                                className="w-5 h-5 text-indigo-600 rounded bg-gray-100 border-gray-300 focus:ring-indigo-500"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveTestCase(qIndex, tcIndex)
                              }
                              className="text-gray-400 hover:text-red-500 mt-6"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-indigo-700 transition shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <FaCheck /> Create Coding Practice Test
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TPOCodingAssessmentForm;
