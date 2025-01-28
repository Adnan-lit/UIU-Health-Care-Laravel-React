import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DashboardContent from "./Components/DashboardContent";

export default function PharmacistDashboard() {
  const menuItems = [
    { href: route('pharmacist'), icon: "fa-solid fa-house", label: "Dashboard" },
    { href: route('pharmacist.medicine'), icon: "fa-solid fa-pills", label: "Medicine" },
    { href: "/admin/orders", icon: "fa-solid fa-box", label: "Orders" },
    { href: "/admin/payments", icon: "fa-solid fa-credit-card", label: "Payments" },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Dashboard">
      <Head title="Pharmacist Dashboard" />
      <DashboardContent />
    </DashboardLayout>
  );
}
