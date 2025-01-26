import { AlertCircle } from "lucide-react"
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, usePage } from "@inertiajs/react";
import PatientLayout from "./Patient/Layout/PatientLayout";


export default function Error() {
    const { auth } = usePage().props;

    const isAuthorized = auth.user;
    return (
        <>

       {isAuthorized && isAuthorized.role === 0 ? (
        <PatientLayout >
        <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <div className="flex justify-center mb-6">
            <AlertCircle className="w-24 h-24 text-[#FF8A3D]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-400 text-lg mb-8">
            We apologize for the inconvenience. Please try again or return to the dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <PrimaryButton
              onClick={() => window.location.reload()}
              variant="outline"
              className="bg-transparent border-[#FF8A3D] text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white transition-colors"
            >
              Try Again
            </PrimaryButton>
            <Link href="/dashboard">
              <PrimaryButton className="bg-[#FF8A3D] text-white hover:bg-[#FF8A3D]/90 transition-colors">
                Back to Dashboard
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      </PatientLayout>
         ) : (
          <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto text-center mt-20">
             <div className="flex justify-center mb-6">
                <AlertCircle className="w-24 h-24 text-[#FF8A3D]" />
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h1>
             <p className="text-gray-400 text-lg mb-8">
                We apologize for the inconvenience. Please try again or return to the dashboard.
             </p>
             <div className="flex justify-center gap-4">
                <PrimaryButton
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="bg-transparent border-[#FF8A3D] text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white transition-colors"
                >
                  Try Again
                </PrimaryButton>
                <Link href="/dashboard">
                  <PrimaryButton className="bg-[#FF8A3D] text-white hover:bg-[#FF8A3D]/90 transition-colors">
                 Back to Dashboard
                  </PrimaryButton>
                </Link>
             </div>
          </div>
         </div>
         )
       }
       </>
    );
}
