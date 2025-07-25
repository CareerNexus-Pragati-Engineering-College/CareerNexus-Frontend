import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function logout() {

    try{
       
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role')
        toast.success("Logout successful! Redirecting to login page...");
       
        
    }
    catch (error) {
        console.error("Logout failed:", error);
        throw error; // Re-throw the error for further handling if needed
    }
    
}

export default logout;