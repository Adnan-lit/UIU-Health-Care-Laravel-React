import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import ChatApp from "@/Pages/Patient/Components/ChatApp.jsx";
import {Head, usePage} from "@inertiajs/react";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";

export default function Messages({messageHistory,users,blobSasUrl}) {



    return (
        <PatientLayout title={'Messages'}>
            <Head title="Messages"/>
            <ChatApp messageHistory={messageHistory} users={users} blobSasUrl={blobSasUrl}></ChatApp>
        </PatientLayout>
    );
}
