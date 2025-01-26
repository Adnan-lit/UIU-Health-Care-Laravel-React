import DashboardLayout from "@/Layouts/DashboardLayout.jsx";

export default function DoctorLayout({ children,title }) {
    const menuItems = [
        { href: "/doctor", icon: "fa-solid fa-house", label: "Overview" },
        { href: "/doctor/patient", icon: "fa-solid fa-hospital-user", label: "Patients" },
        { href: "/doctor/appointments", icon: "fa-solid fa-calendar-check", label: "Appointments" },
        { href: "/doctor/consultation", icon: "fa-solid fa-stethoscope", label: "Consultation" },
    ];

    const notifications = [
        { id: 1, message: "New user registered" },
        { id: 2, message: "New post published" },
    ];

    const user = {
        name: "Dr. John Doe",
        userType: "Sergion",
        avatar: "https://placehold.co/40x40",

    }



    return (
        <DashboardLayout notifications={notifications} menuItems={menuItems} user={user} title={title}>
            {children}
        </DashboardLayout>
    )

}
