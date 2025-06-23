import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [student, setStudent] = useState({
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: '123456',
    department: 'CSE',
    year: '3rd Year'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const getRandomStats = () => {
    const solved = Math.floor(Math.random() * 100);
    return {
      labels: ['Solved', 'Remaining'],
      datasets: [
        {
          data: [solved, 100 - solved],
          backgroundColor: ['#6B4ECF', '#E0E0E0'],
          hoverBackgroundColor: ['#8B5CF6', '#C1C1C1']
        }
      ]
    };
  };

  const problemsData = getRandomStats();
  const contestsData = getRandomStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins p-6">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-violet-700 hover:underline mb-8 flex items-center"
      >
        ← Go Back
      </button>

      {/* Student Details with Edit */}
      <section className="bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#6B4ECF]">Student Details</h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-sm text-violet-700 hover:underline"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#4b436f]">
          {Object.entries(student).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-[#4b436f] capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:ring-violet-200"
                />
              ) : (
                <p className="text-base font-medium">{value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard title="Problems Solved" data={problemsData} />
        <StatCard title="Contests Attended" data={contestsData} />
        <div className="bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 flex flex-col justify-center text-center">
          <h3 className="text-lg font-semibold text-[#6B4ECF] mb-4">LeetCode Stats</h3>
          <p className="text-[#4b436f]">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, data }) => (
  <div className="bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 text-center">
    <h3 className="text-lg font-semibold text-[#6B4ECF] mb-4">{title}</h3>
    <div className="w-36 h-36 mx-auto">
      <Pie data={data} />
    </div>
  </div>
);

export default StudentProfile;
