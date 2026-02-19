import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import requestApi from "../../services/request";


const QuickApplyModal = ({ job, onClose, onApply, userId }) => {
  // Form state
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    userId: "",
    Department: "",
    Year: "",
    Cgpa: "",
    Email: "",
    Phone: "",
    skills: "",
    graduationYear: "",
    resume: null,
  });

  // Additional states
  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

  // Helper: safely parse arrays
  function parseArray(value) {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await requestApi.get(`/student/${userId}/profile`);
        const data = res.data;
        const populated = {
          FirstName: data.firstName || "",
          LastName: data.lastName || "",
          userId: data.userId || "",
          Department: data.department || "",
          Year: data.year || "",
          Cgpa: data.cgpa || "",
          Email: data.email || "",
          Phone: data.phone || "",
          skills: parseArray(data.skills).join(", ") || "",
          graduationYear: data.graduationYear || "",
          resume: null,
        };
        setUrls(parseArray(data.urls));
        setFormData(populated);
        setOriginalData(populated);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    if (userId) fetchStudentData();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "resume" ? files[0] : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      const modified = Object.keys(updated).some((key) => {
        if (key === "resume") return updated.resume !== null;
        return updated[key] !== originalData[key];
      });
      setIsModified(modified);
      return updated;
    });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "resume" && !value.toString().trim()) {
        newErrors[key] = "Required";
      }
    });
    if (!formData.resume && !isEditing) newErrors.resume = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing && isModified) {
      const payload = {
        userId: formData.userId,
        skills: JSON.stringify(formData.skills.split(",").map((s) => s.trim())),
        email: formData.Email,
        phone: formData.Phone,
        firstName: formData.FirstName,
        lastName: formData.LastName,
        department: formData.Department,
        year: formData.Year,
        cgpa: formData.Cgpa,
        graduationYear: formData.graduationYear,
        urls: JSON.stringify(urls),
      };

      try {
        setLoading(true);
        await requestApi.post(`student/${userId}/profile`, payload);
        toast.success("Profile updated successfully!");

        setIsEditing(false);
        setIsModified(false);
        setOriginalData(formData);


      } catch (err) {
        console.error("Failed to update profile:", err);
        toast.error("Failed to update profile. Please try again.");
      }
      finally {

        setLoading(false);
      }
      return;
    }
    else {

      if (!formData.resume) {
        toast.error("Please upload your resume.");
        setLoading(false);
        return;
      }
      try {

        const resumeData = new FormData();
        resumeData.append("resumeFile", formData.resume);
        const response = await requestApi.post(`/applications/apply/${userId}/${job.id}`, resumeData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        );
        setLoading(true);

        const appliedJob = {
          ...job,
          applied: true,
          appliedDate: new Date().toISOString(),
          status: "Under Review",
        };

        onApply(appliedJob);
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          onClose();
        }, 1200);

      }

      catch (error) {
        console.error("Failed to apply for job:", error);
        toast.error("Failed to apply for job. Please try again.");
      }

      finally {
        setLoading(false);
        window.location.reload();
      }
    }
  };


  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditing) {
      setFormData(originalData);
      setIsEditing(false);
      setIsModified(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl relative overflow-y-auto max-h-[90vh] scrollbar-hide">


        {/* Close button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        {/* Job title and company */}
        <h3 className="text-xl font-semibold mb-1 text-gray-800">
          Apply for {job.job_title}
        </h3>
        <p className="text-sm text-gray-900 font-medium mb-4">{job.company_name}</p>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
          {["FirstName", "LastName", "userId", "Department", "Year", "Cgpa", "Email", "Phone", "skills", "graduationYear"].map((field) => (
            <div key={field} className="col-span-1">
              <label className="font-medium text-gray-700">
                {field === "Cgpa"
                  ? "CGPA"
                  : field === "userId"
                    ? "User ID"
                    : field === "Email"
                      ? "Email Address"
                      : field === "Phone"
                        ? "Phone Number"
                        : field === "skills"
                          ? "Skills (comma separated)"
                          : field === "graduationYear"
                            ? "Graduation Year"
                            : field.replace(/([A-Z])/g, " $1")} {" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={field === "graduationYear" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? "bg-white" : "bg-gray-100"} border-gray-300 rounded px-3 py-2 mt-1`}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Resume Upload - only shown when not editing */}
          {!isEditing && (
            <div className="col-span-2">
              <label className="font-medium text-gray-700">
                Upload Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
              {errors.resume && (
                <p className="text-red-500 text-xs">{errors.resume}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="col-span-2 flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className="border border-purple-700 text-purple-700 px-4 py-1.5 rounded hover:bg-purple-50 transition text-sm font-semibold"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded text-sm font-semibold"
            >
              {loading ? "Please wait..." : isEditing && isModified ? "Update" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickApplyModal;