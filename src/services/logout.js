import toast from "react-hot-toast";

function logout() {

    try {

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