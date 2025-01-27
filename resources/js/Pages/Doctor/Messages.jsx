import ChatApp from "@/Pages/Patient/Components/ChatApp.jsx";
import {Head, usePage} from "@inertiajs/react";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";

export default function Messages({messageHistory,users,blobSasUrl}) {



    return (
        <DoctorLayout title={'Messages'}>
            <Head title="Messages"/>
            <ChatApp messageHistory={messageHistory} users={users} blobSasUrl={blobSasUrl}></ChatApp>
        </DoctorLayout>
    );
}
