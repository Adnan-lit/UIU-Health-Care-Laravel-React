import {Head, router, usePage} from "@inertiajs/react";
import SideBar from "@/Pages/Admin/Components/SideBar.jsx";
import TopBar from "@/Pages/Admin/Components/TopBar.jsx";
import CustomerVsRetention from "@/Pages/Admin/Components/CustomerVsRetention.jsx";
import React, { useEffect, useState } from "react";
import CallingModal from "@/Components/CallingModal.jsx";
import {toast, ToastContainer} from "react-toastify";
import Loader from "@/Components/Loader";

export default function DashboardLayout({ children, menuItems, notifications, title }) {

    const { auth } = usePage().props;
    console.log(auth.user);


    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [consultationID, setConsultationID] = useState(null); // State to store the consultation ID
    

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



    useEffect(() => {

        Echo.private(`messaging.${auth.user.id}`)
            .listen('.MessageReceiveEvent', (e) => {
                console.log('Message received:', e);
                toast(`${e.messageData.sender_name}: Sent a message`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            })
            .error((error) => {
                console.error('Channel subscription error:', error);
            });
    }, [auth.user.id]);


    // Calling tone audio

    useEffect(() => {
        Echo.private(`calling.${auth.user.id}`)
            .listen('.CallingNotificationEvent', (e) => {
                setConsultationID(e.consultationID); // Set the consultation ID
                console.log('Calling notification received:', e);
                setIsModalOpen(true); // Show the modal
            })
            .error((error) => {
                console.error('Channel subscription error:', error);
            });
    }, [auth.user.id]);

    // Close the modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
      {isRefreshing  ? (
        <Loader />
      ) : (
         <div className="flex h-screen w-screen bg-gradient-to-r from-[#ffff] to-[#CEA88E]">
            <ToastContainer />
            <SideBar menuItems={menuItems} />
            <div className="flex flex-col h-full w-full pr-[50px] pb-5">
                <TopBar notifications={notifications} user={auth.user} title={title} />
                <div className={"flex flex-col gap-4 w-full h-full bg-white rounded-2xl shadow p-5"}>
                    {children}
                </div>
            </div>

            {/* Calling Modal */}
            <CallingModal isOpen={isModalOpen} onClose={closeModal} consultationID={consultationID} />
        </div>
      )}
    </>
       
    );
}
