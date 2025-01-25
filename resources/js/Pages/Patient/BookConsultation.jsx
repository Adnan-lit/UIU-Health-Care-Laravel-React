import {Link, router} from "@inertiajs/react";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

function handleBookConsultation(docID) {
    router.post('/patient/consultation/book', {
            doc_id: docID
        }, {
            preserveScroll: true
        }
    );
}


    export default function BookConsultation({doctor}) {
        return (
            <PatientLayout title={"Book Consultation"}>
                <div className={'h-[80vh] overflow-y-auto'}>
                    {/* Header Section */}
                    <header className="bg-[#f49e2a] rounded-tr-xl rounded-tl-xl text-white py-6">
                        <div className="container mx-auto text-center">
                            <h1 className="text-4xl font-bold">Online Consultation</h1>
                            <p className="mt-2 text-lg">Connect with your doctor online</p>
                        </div>
                    </header>

                    {/* Doctor and Consultation Details */}
                    <section
                        className="flex flex-col mx-auto p-8 justify-center items-start bg-white rounded-lg shadow-md">

                        {/* Doctor Info Section */}
                        <div className="flex items-center mb-8">
                            <img
                                src={doctor.profile_photo_path}
                                alt="Doctor"
                                className="w-32 h-32 rounded-full mr-6"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-700">{doctor.name}</h3>
                                <p className="text-gray-600">Specialization: {doctor.specialty}</p>
                                <div className={'flex gap-4 w-full justify-evenly mt-6'}>
                                    <div>
                                        <p className="text-gray-600 font-bold">Experiences: </p>
                                        <table
                                            className="table-auto border-collapse w-full mt-6 text-gray-600 text-left bg-white shadow-md rounded-lg overflow-hidden">
                                            <thead className="bg-[#f49e2a] text-white w-full">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Designation</th>
                                                <th className="px-6 py-4 font-semibold">Hospital</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {JSON.parse(doctor.experiences).map((experience, index) => (
                                                <tr
                                                    key={experience.designation}
                                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                                >
                                                    <td className="px-6 py-4 border-t">{experience.designation}</td>
                                                    <td className="px-6 py-4 border-t">{experience.hospital}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>

                                    <div>
                                        <p className="text-gray-600 font-bold">Educations: </p>
                                        <table
                                            className="table-auto border-collapse w-full mt-6 text-gray-600 text-left bg-white shadow-md rounded-lg overflow-hidden">
                                            <thead className="bg-[#f49e2a] text-white w-full">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Degree</th>
                                                <th className="px-6 py-4 font-semibold">Institution</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {JSON.parse(doctor.educations).map((education, index) => (
                                                <tr
                                                    key={education.degree}
                                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                                >
                                                    <td className="px-6 py-4 border-t">{education.degree}</td>
                                                    <td className="px-6 py-4 border-t">{education.institution}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Consultation Fee Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700">
                                Consultation Fee: BDT 100
                            </h4>

                        </div>


                        {/* Book Consultation Button */}
                        <div className={'flex gap-4'}>
                            <a
                                href={`/patient/bkash/create-payment?id=${doctor.doc_id}&amount=1&purpose=Consultation&callback=${window.location.origin}/patient/bkash/callback&paymentOrigin=${window.location.href}`}
                                className="w-40 bg-[#f49e2a] text-white py-3 mt-4 rounded-md hover:bg-gray-600"

                            >
                                Book Consultation
                            </a>
                            <Link
                                href="/patient/consultation"
                                className="w-40 bg-gray-600 text-white text-center py-3 mt-4 rounded-md hover:bg-[#f49e2a]"
                            >
                                Cancel
                            </Link>
                        </div>
                    </section>
                </div>
            </PatientLayout>
        )

}
