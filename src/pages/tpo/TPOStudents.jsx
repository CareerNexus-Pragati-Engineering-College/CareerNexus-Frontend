import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";
import { toast } from "react-toastify";

const departments = [
  "CSE", "CSE-IT", "CSE-AI", "CSE-AIML", "CSE-DS", "Cyber Security",
  "ECE", "EEE", "MECH", "CIVIL"
];

const platforms = ["LinkedIn", "LeetCode", "HackerRank", "GitHub"];

const dummyData = [
  {
    id: "STU001",
    name: "Akshay",
    department: "CSE",
    profileLink: "https://linkedin.com/in/akshay",
  },
  {
    id: "STU001",
    name: "chinnu",
    department: "CSE",
    profileLink: "https://linkedin.com/in/akshay",
  },
  {
    id: "STU001",
    name: "Omggg",
    department: "CSE",
    profileLink: "https://linkedin.com/in/akshay",
  },
  {
    id: "STU002",
    name: "Ravi",
    department: "ECE",
    profileLink: "https://leetcode.com/ravi",
  },
  {
    id: "STU003",
    name: "Sneha",
    department: "CSE-AIML",
    profileLink: "https://hackerrank.com/sneha",
  },
  {
    id: "STU004",
    name: "Kiran",
    department: "EEE",
    profileLink: "https://linkedin.com/in/kiran",
  },
  {
    id: "STU005",
    name: "Meena",
    department: "CSE",
    profileLink: "https://leetcode.com/meena",
  },
];

const TpoStudents = () => {
  const navigate = useNavigate();
  const { userid } = useParams();

  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [platform, setPlatform] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = async () => {

    if (year && department && platform) {

      try {
        const response = await requestApi.get(`/tpo/student/get-profile-links/${year}/${department}`);
     
        setFilteredData(
          response.data
            .map(student => {
              return JSON.parse(student.urls)
                .filter(url => url.platform === platform)       
                .map(url => ({
                  id: student.userId,
                  name: student.firstName + ' ' + student.lastName,
                  department: department,              
                  profileLink: url.url                         
                }));
            })
            .flat()  
        );
        if( response.data.length === 0) {
          toast.error("No students found for the selected filters.", {
            position: "top-right",
            theme: "colored",
            style: { backgroundColor: "#dc2626", color: "#fff" },
          });
        } else {
          toast.success("Student data fetched successfully!")
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Failed to fetch student data.", {
          position: "top-right",
          theme: "colored",
          style: { backgroundColor: "#dc2626", color: "#fff" },
        });
      }

    } else {
      setFilteredData(dummyData);
      toast.error("Please select all filters", {
        position: "top-right",

      })
    }
  };


  useEffect(() => {
    console.log(filteredData);
  }, [filteredData])
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map(({ id, name, department, profileLink }) => ({
        ID: id,
        Name: name,
        Department: department,
        "Profile Link": profileLink,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_data.xlsx");
  };

  const filteredSearchResults = filteredData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 px-4 py-6 md:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header & Back */}
      <div className="relative mb-6">
        <button
          onClick={() => navigate(`/tpo/${userid}/home`)}
          className="text-violet-700 hover:underline font-medium text-base"
        >
          ← Back
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-violet-800 text-center">
          🎓 Explore Student Profiles
        </h2>
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="p-2 rounded-xl shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">Select Year</option>
          {[1, 2, 3, 4].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
          className="p-2 rounded-xl shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setPlatform(e.target.value)}
          value={platform}
          className="p-2 rounded-xl shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">Select Platform</option>
          {platforms.map((plat) => (
            <option key={plat} value={plat}>
              {plat}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl shadow hover:bg-violet-700 transition"
        >
          Submit
        </button>
      </div>

      {/* Search & Download */}
      {filteredData.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by student name..."
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-violet-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleDownload}
            className="mt-2 md:mt-0 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl hover:brightness-105 shadow-md transition-all"
          >
            📥 Download Excel
          </button>
        </div>
      )}

      {/* Table */}
      {filteredSearchResults.length > 0 ? (
        <div className="overflow-x-auto mt-6 rounded-xl shadow-2xl backdrop-blur-sm bg-white/60 p-4">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-violet-100 text-violet-900">
                <th className="py-3 px-5 rounded-l-xl">Student ID</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Department</th>
                <th className="py-3 px-5 rounded-r-xl">Profile Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredSearchResults.map((student, idx) => (
                <tr
                  key={idx}
                  className="bg-white/80 hover:bg-violet-50 transition duration-200 text-gray-700 shadow-sm"
                >
                  <td className="py-2 px-5 rounded-l-xl">{student.id}</td>
                  <td className="py-2 px-5">{student.name}</td>
                  <td className="py-2 px-5">{student.department}</td>
                  <td className="py-2 px-5 rounded-r-xl">
                    <a
                      href={student.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-violet-700 underline break-all"
                    >
                      {student.profileLink}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredData.length > 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No students match your search.
        </p>
      ) : null}
    </motion.div>
  );
};

export default TpoStudents;