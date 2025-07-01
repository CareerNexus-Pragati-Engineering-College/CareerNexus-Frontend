import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const logout = async () => {
    const navigate = useNavigate();
    try{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success("Logout successful! Redirecting to login page...");
        navigate("/student");
        
    }
    catch (error) {
        console.error("Logout failed:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export default logout;