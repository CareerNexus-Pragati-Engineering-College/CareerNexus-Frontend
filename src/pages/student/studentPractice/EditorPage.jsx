import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import CodeEditor from './CodeEditor';
import { toast } from 'react-hot-toast'; // Import toast for notifications
import AnimatedBackground from '../background/AnimatedBackground';

const EditorPage = () => {
  const { sessionId } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const MIN_WIDTH_REQUIRED = 770; // Define the minimum width requirement

  let username = "AnonymousUser"; // Default fallback
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.sub || decodedToken.username || "UnknownAuthenticatedUser";
      localStorage.setItem("loggedInUsername", username); // Store for consistency if needed elsewhere
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      // Fallback to anonymous if token is invalid/expired on client side
      username = "InvalidTokenUser";
      toast.error("Invalid or expired session token. Please log in again.");
      // Optionally, redirect to login page if token is invalid
      // navigate('/auth');
    }
  }

  // Effect to track window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Initial check for display
    if (window.innerWidth <= MIN_WIDTH_REQUIRED) {
      toast.error(`Please use a screen wider than ${MIN_WIDTH_REQUIRED}px for the best experience. Current width: ${window.innerWidth}px`);
    } else {
      toast.dismiss(); // Dismiss any previous width warnings if window resizes large enough
    }


    return () => {
      window.removeEventListener('resize', handleResize);
      toast.dismiss(); // Dismiss toasts when component unmounts
    };
  }, [MIN_WIDTH_REQUIRED]); // Re-run effect if MIN_WIDTH_REQUIRED changes (unlikely)


  // Conditional rendering based on window width
  if (windowWidth <= MIN_WIDTH_REQUIRED) {
    return (
      <>

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 text-center">


          <h1 className="text-4xl font-bold text-red-500 mb-4">Screen Size Warning</h1>
          <p className="text-lg text-gray-300 mb-6">
            This collaborative editor is designed for larger screens.
          </p>
          <p className="text-md text-gray-400">
            Please open this page on a screen with a width greater than {MIN_WIDTH_REQUIRED} pixels for optimal experience.
            <br />
            Your current screen width is: <span className="font-semibold text-yellow-400">{windowWidth}px</span>
          </p>

          <button onClick={() => navigate('/dashboard')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200">
            Go to Dashboard
          </button>
        </div>
      </>
    );
  }

  // If screen width is sufficient, render the CodeEditor
  return (
    <>

      <AnimatedBackground />
      <CodeEditor sessionId={sessionId} username={username} />
    </>
  );
};

export default EditorPage;
