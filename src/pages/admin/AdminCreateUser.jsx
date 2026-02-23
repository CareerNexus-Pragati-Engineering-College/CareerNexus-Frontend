import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaEnvelope, FaUserTag, FaIdCard, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import requestApi from "../../services/request";
import toast from "react-hot-toast";

const AdminCreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        email: "",
        role: "student"
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const roles = [
        { id: "student", label: "Student", desc: "Access to jobs and exams" },
        { id: "recruiter", label: "Recruiter", desc: "Manage jobs and candidates" },
        { id: "tpo", label: "TPO", desc: "Placement coordination" }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await requestApi.post("/admin/create-user", formData);
            toast.success("User created and welcome email sent!");
            setSuccess(true);
            setTimeout(() => navigate("/admin"), 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Failed to create user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center p-6 font-outfit">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-white text-center relative">
                    <button 
                        onClick={() => navigate("/admin")}
                        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
                        <FaUserPlus />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Create New User</h1>
                    <p className="text-violet-100 mt-2 font-medium">Automatic password generation & email notification</p>
                </div>

                {/* Form */}
                <div className="p-10">
                    {!success ? (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                {/* User ID */}
                                <div>
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 block">Username / ID</label>
                                    <div className="relative group">
                                        <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                                        <input 
                                            type="text" 
                                            name="userId"
                                            value={formData.userId}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. jdoe2024"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-violet-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 block">Email Address</label>
                                    <div className="relative group">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="user@example.com"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-violet-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 block">Assign Role</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {roles.map((role) => (
                                            <label 
                                                key={role.id}
                                                className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                                    formData.role === role.id 
                                                    ? 'bg-violet-50 border-violet-500 shadow-md ring-4 ring-violet-500/10' 
                                                    : 'bg-white border-gray-100 hover:border-violet-200'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="role" 
                                                    className="hidden" 
                                                    value={role.id}
                                                    checked={formData.role === role.id}
                                                    onChange={handleChange}
                                                />
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                                     formData.role === role.id ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 shadow-inner'
                                                }`}>
                                                    <FaUserTag />
                                                </div>
                                                <div className="ml-4">
                                                    <p className={`font-black tracking-tight ${formData.role === role.id ? 'text-violet-900' : 'text-gray-700'}`}>{role.label}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{role.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-5 rounded-[1.25rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 tracking-wider uppercase text-sm"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Create & Send Email <FaCheckCircle /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-10">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl"
                            >
                                <FaCheckCircle />
                            </motion.div>
                            <h2 className="text-3xl font-black text-gray-800 mb-2">Registration Successful!</h2>
                            <p className="text-gray-500 font-medium mb-8">The welcome email with credentials is on its way.</p>
                            <p className="text-xs text-gray-400 italic">Redirecting you back to dashboard...</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdminCreateUser;
