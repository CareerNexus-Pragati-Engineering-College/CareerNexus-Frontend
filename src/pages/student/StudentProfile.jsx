import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useInView = (offset = 150) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      if (top < window.innerHeight - offset) setInView(true);
    };
    window.addEventListener('scroll', checkPosition);
    checkPosition();
    return () => window.removeEventListener('scroll', checkPosition);
  }, [offset]);

  return [ref, inView];
};

const RibbonBadge = ({ rank }) => {
  const colors = {
    Bronze: '#cd7f32',
    Silver: '#c0c0c0',
    Gold: '#ffd700'
  };
  const color = colors[rank] || '#aaa';

  return (
    <div className="absolute -top-6 -right-6 z-10">
      <div className="relative w-11 h-20 flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-full border-4 border-white relative z-10"
          style={{ backgroundColor: color, boxShadow: `0 0 0 4px white, 0 0 0 6px ${color}` }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
            {rank}
          </div>
        </div>
        <div className="absolute top-full -translate-y-1 flex justify-center items-start gap-[2px] z-0">
          <div
            className="w-3 h-6 transform rotate-[25deg] origin-top-right"
            style={{ backgroundColor: color, borderBottomLeftRadius: '2px' }}
          ></div>
          <div
            className="w-3 h-6 transform -rotate-[25deg] origin-top-left"
            style={{ backgroundColor: color, borderBottomRightRadius: '2px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const StatSection = ({ title, solved, total, rank, buttonLabel }) => {
  const [ref, inView] = useInView(300);
  const percent = Math.min(100, Math.round((solved / total) * 100));

  return (
    <div
      ref={ref}
      className="relative bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 w-full max-w-xl mx-auto transition-all duration-300 ease-in-out"
    >
      <RibbonBadge rank={rank} />
      <h3 className="text-lg font-semibold text-[#6B4ECF] mb-3">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full bg-[#6B4ECF] transition-all duration-[1500ms] ease-out"
              style={{ width: inView ? `${percent}%` : '0%' }}
            ></div>
          </div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E4EBFE] border-2 border-[#6B4ECF] text-[#6B4ECF] font-bold text-sm">
          {percent}%
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center text-sm text-[#4b436f]">
        <div className="flex items-center gap-3">
          <button className="px-4 py-1 border border-[#6B4ECF] bg-[#E4EBFE] text-[#6B4ECF] rounded-full text-sm font-medium hover:bg-[#d6e2fe] transition">
            {buttonLabel}
          </button>
          <span>{solved} / {total}</span>
        </div>
        <span>Rank: <strong>{rank}</strong></span>
      </div>
    </div>
  );
};

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  const [student, setStudent] = useState({
    firstName: 'Pranay',
    lastName: 'K',
    rollNumber: '22A31A0542',
    department: 'CSE',
    year: '4th Year',
    cgpa: '7.4',
    gmail: 'pranayk74174174@gmail.com',
    phone: '9876543210'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && skills.length < 10 && !skills.includes(s)) {
      setSkills([...skills, s]);
      setNewSkill('');
    }
  };

  const removeSkill = (s) => setSkills(skills.filter((item) => item !== s));

  useEffect(() => {
    fetch('https://leetcode-stats-api.herokuapp.com/john_doe')
      .then(res => res.json())
      .then(data => setLeetcodeStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white/40 border border-violet-300 text-violet-700 px-4 py-2 rounded-lg hover:bg-white/60 transition"
      >
        ←
      </button>

      <div className="max-w-4xl mx-auto pt-20 pb-10 flex flex-col gap-12">
        <section className="bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 w-full">
          <h2 className="text-xl font-semibold text-[#6B4ECF] mb-6 text-center">Student Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[#4b436f] mb-6">
            {Object.entries(student).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                {isEditing ? (
                  <input
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

          <div className="border-2 border-violet-300 rounded-2xl p-4 mb-6">
            <p className="text-sm mb-2 font-medium">Skills</p>
            {isEditing && (
              <div className="flex gap-2 mb-4">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:ring-violet-200"
                  placeholder="Enter skill"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-1.5 text-sm bg-[#6B4ECF] text-white rounded hover:bg-[#5939b8] transition"
                >
                  Add
                </button>
              </div>
            )}
            <div className="max-h-28 overflow-y-auto flex flex-wrap gap-2">
              {skills.map((s) => (
                <div
                  key={s}
                  className="flex items-center bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm"
                >
                  <button
                    onClick={() => removeSkill(s)}
                    className="mr-1 text-red-600 font-bold hover:text-red-800"
                  >
                    ×
                  </button>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="w-full text-center py-2 bg-[#6B4ECF] text-white rounded-full text-sm font-medium hover:bg-[#5939b8] transition"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </section>

        <StatSection title="Problems Solved" solved={75} total={100} rank="Gold" buttonLabel="Solve More" />
        <StatSection title="Contests Attended" solved={12} total={20} rank="Silver" buttonLabel="Join More" />

        <section className="bg-white/40 backdrop-blur-md border border-violet-200/40 rounded-3xl shadow-md p-6 text-center w-full max-w-xl mx-auto hover:shadow-xl transition-all duration-300 ease-in-out">
          <h3 className="text-lg font-semibold text-[#6B4ECF] mb-4">LeetCode Stats</h3>
          {leetcodeStats ? (
            <div className="text-[#4b436f] text-sm space-y-1">
              <p>Total Solved: <strong>{leetcodeStats.totalSolved}</strong></p>
              <p>Easy: {leetcodeStats.easySolved}, Medium: {leetcodeStats.mediumSolved}, Hard: {leetcodeStats.hardSolved}</p>
              <p>Ranking: #{leetcodeStats.ranking}</p>
              <p>Reputation: {leetcodeStats.reputation}</p>
              <p>Contribution Points: {leetcodeStats.contributionPoints}</p>
            </div>
          ) : (
            <p className="text-[#4b436f]">Loading stats...</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentProfile;
