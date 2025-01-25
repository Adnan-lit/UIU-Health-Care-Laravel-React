import ApplicationLogo from '@/Components/ApplicationLogo';
import Loader from '@/Components/Loader';
import { Link } from '@inertiajs/react';

import { useEffect, useState } from 'react';



export default function AuthLayout ({ children }) {

    
const [isRefreshing, setIsRefreshing] = useState(false); // Loader state for refresh only

useEffect(() => {
    // Show loader on refresh
    const handleBeforeUnload = () => {
      localStorage.setItem("isRefreshing", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Check if the page is being refreshed
    const isPageRefreshing = localStorage.getItem("isRefreshing") === "true";

    if (isPageRefreshing) {
      setIsRefreshing(true);

      // Clear the flag and hide loader after 5 seconds
      const timer = setTimeout(() => {
        setIsRefreshing(false);
        localStorage.removeItem("isRefreshing");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);
    return (
        <>
        {isRefreshing  ? (
          <Loader />
        ) :
        (
            <div className="flex flex-row h-[100vh] w-[100vw] bg-gradient-to-r from-[#4f48e6] from-10% via-[#6968f0] via-30% to-[#808bf7] to-90%">
            {/* Left Section */}
            <div className="w-[60%] h-full flex flex-col gap-2 text-white pl-32 pr-16 justify-center">
                <img className="h-20 w-fit mb-8" src="../images/logo.png" alt="Logo" />
                <h1 className="text-[2.5em] font-bold">Welcome to UIU Healthcare</h1>
                <p className="text-[1.1em] mb-8">Your health is just a click away!</p>
                <p className="text-gray-200">
                    Connecting students, faculty, and staff to better healthcare. Schedule appointments, access records, and order medicines—all in one place.
                </p>
            </div>

            {/* Right Section (Dynamic Content) */}
            <div className="flex flex-col items-center pt-20 w-[34%] h-[85%] mt-auto bg-white rounded-t-[30px]">
                {children}
            </div>
        </div>
        )
        }
        </>
    );
};
