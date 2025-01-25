import React, { useState, useEffect } from 'react';
import {Link} from "@inertiajs/react"; // Include your Tailwind CSS and other custom styles
import Loader from '@/Components/Loader';

// Loading component

const Header = () => (
    <header className="bg-gray-50">
        <nav className="container mx-auto px-6 lg:px-20 flex justify-between items-center py-4">
            <div className="flex items-center space-x-5">
                <img src="../images/patient/logo.png" alt="Logo" className="h-14" />
            </div>
            <ul className="hidden md:flex space-x-8 text-gray-700 font-medium ml-96">
                {["Home", "Doctors", "Services", "Blood Bank", "Contact"].map((item) => (
                    <li key={item}>
                        <a href="#" className="hover:text-blue-600">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <a href={'./login'} className="hidden md:block font-bold bg-gradient-to-r from-blue-800 to-violet-800 text-white px-8 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-violet-600 transition-all duration-300 ease-in-out">
                Log In
            </a>
        </nav>

        <div className="relative bg-white py-10">
            <div className="absolute inset-0 flex justify-center items-start z-0 mt-32 pointer-events-none font-sans">
                <div className="absolute inset-0 m-auto w-[400px] h-[270px] bg-[#2973e6] rounded-full blur-[350px]"></div>
                <h1 className="text-[150px] font-call font-extrabold text-blue-900 leading-none tracking-wide">
                    Health<span className="text-gray-700">Care</span>
                </h1>
            </div>

            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 relative z-10">
                <div className="mt-32">
                    <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        {[
                            {
                                icon: "fa-suitcase-medical",
                                text: "Expert Consultations",
                                color: "#5a8cdd",
                            },
                            {
                                icon: "fa-heart-pulse",
                                text: "Fitness Monitoring",
                                color: "#e882b3",
                            },
                            {
                                icon: "fa-person-chalkboard",
                                text: "Personalized Care Plans",
                                color: "#41af85",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-center bg-white shadow-lg px-7 py-2 rounded-full"
                            >
                                <i className={`fa-solid ${feature.icon}`} style={{ color: feature.color }}></i>
                                <span className="text-gray-800 ml-3">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <img src="../images/patient/doc.png" alt="Doctor" className="mx-auto" />
                </div>
            </div>
        </div>
    </header>
);

const About = () => (
    <section className="bg-white py-16">
        <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-cyan-700 text-left mb-8">
                About UIU Health Care
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <img src="../images/patient/about.png" alt="Health Care Icon" className="w-40 h-32 ml-8" />
                </div>
                <div>
                    <p className="text-gray-700 text-base leading-relaxed ml-20">
                        The UIU Health Care System is designed to streamline healthcare services for the university community. It provides a seamless way to book appointments, access medical records, and stay informed about health-related news, all from a single platform.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-cyan-700 text-left">Features We Provide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {[
                    {
                        img: "../images/patient/vdcall.png",
                        title: "Instant Video Consultant",
                        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                    },
                    {
                        img: "../images/patient/medicined.png",
                        title: "24/7 Medical Delivery",
                        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                    },
                    {
                        img: "../images/patient/appoint.png",
                        title: "Doctor Appointment",
                        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                    },
                ].map((feature, idx) => (
                    <div key={idx} className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <img src={feature.img} alt={feature.title} className="h-40 mx-auto" />
                        <h3 className="text-lg font-bold text-blue-600 mt-4">{feature.title}</h3>
                        <p className="text-gray-600 mt-2">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-100 text-gray-600 py-10">
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
                <div className="flex items-center space-x-4">
                    <img src="../images/patient/logo.png" alt="UIU Health Care Logo" className="h-16" />
                </div>
                <p className="mt-4">Your trusted healthcare partner on campus.</p>
                <div className="flex mt-4 space-x-4">
                    {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((social, idx) => (
                        <a key={idx} href="#" className="text-blue-600 hover:text-blue-800">
                            <i className={`fab fa-${social}`}></i>
                        </a>
                    ))}
                </div>
            </div>
            {/* Add other footer sections similarly */}
        </div>
    </footer>
);

const LandingPage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (you can remove setTimeout if you have actual data fetching)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen">
            <Header />
            <About />
            <Features />
            <Footer />
        </div>
    );
};

export default LandingPage;
