import React, { useState } from "react";
import AdminLayout from "@/Pages/Admin/Layout/AdminLayout.jsx";
import {Head, Link, usePage} from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import { Button } from "@headlessui/react";

export default function AddDoctor() {
    const { data, setData, post, errors, reset,processing } = useForm({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        educations: [{ degree: "", institution: "" }],
        experiences: [{ designation: "", hospital: "" }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/doctors/create", {
            onError: (errorResponse) => {
                console.error("Validation errors: ", errorResponse);
            },
        });
    };

    const addEducation = () =>
        setData("educations", [...data.educations, { degree: "", institution: "" }]);
    const addExperience = () =>
        setData("experiences", [...data.experiences, { designation: "", hospital: "" }]);

    const handleEducationChange = (index, field, value) => {
        const updated = [...data.educations];
        updated[index][field] = value;
        setData("educations", updated);
    };

    const handleExperienceChange = (index, field, value) => {
        const updated = [...data.experiences];
        updated[index][field] = value;
        setData("experiences", updated);
    };


    return (
        <AdminLayout>
            <Head title="Add Doctor" />
            <div className="flex flex-col w-full h-full">
                <div className="flex gap-4 w-full h-[10%]">
                    <h1 className="text-2xl font-bold">Add Doctor</h1>
                    <Link
                        className="bg-[#f68b1f] rounded-lg text-white font-bold h-8 w-28 text-center justify-center"
                        href="/admin/doctors"
                    >
                        Doctor List
                    </Link>
                </div>
                <div className="flex flex-col gap-4 w-full h-[90%] overflow-y-scroll px-20 pb-10">
                    <div className="flex justify-center gap-4 w-full">
                        <img src="/images/admin/docReg.png" alt="" className="h-8" />
                        <p className="text-2xl font-bold">Doctor Registration Form</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        {/* Basic Information */}
                        <div className="flex gap-20 w-full">
                            <div className="flex flex-col w-[50%] gap-2">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <TextInput
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    error={errors.name}
                                    required={true}
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}

                            </div>

                            <div className="flex flex-col w-[50%] gap-2">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    error={errors.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    required={true}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}

                            </div>

                        </div>
                        <div className="flex gap-20 w-full">
                            <div className="flex flex-col w-[50%] gap-2">
                                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    value={data.phone}
                                    required={true}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}

                            </div>


                            <div className="flex flex-col w-[50%] gap-2">
                                <InputLabel htmlFor="specialty">Specialty</InputLabel>
                                <TextInput
                                    id="specialty"
                                    type="text"
                                    placeholder="Specialty"
                                    value={data.specialty}
                                    onChange={(e) => setData("specialty", e.target.value)}
                                    required={true}
                                />

                            </div>
                        </div>

                        {/* Education Section */}
                        <p className="text-lg font-bold">Education</p>
                        {data.educations.map((education, index) => (
                            <div key={index} className="flex gap-20 w-full">
                                <div className="flex flex-col w-[48%] gap-2">
                                    <InputLabel htmlFor={`degree-${index}`}>Degree</InputLabel>
                                    <TextInput
                                        id={`degree-${index}`}
                                        type="text"
                                        placeholder="Degree"
                                        value={education.degree}
                                        onChange={(e) =>
                                            handleEducationChange(index, "degree", e.target.value)
                                        }
                                        required={true}
                                    />
                                </div>
                                <div className="flex flex-col w-[48%] gap-2">
                                    <InputLabel htmlFor={`institution-${index}`}>
                                        Institution
                                    </InputLabel>
                                    <TextInput
                                        id={`institution-${index}`}
                                        type="text"
                                        placeholder="Institution"
                                        value={education.institution}
                                        onChange={(e) =>
                                            handleEducationChange(index, "institution", e.target.value)
                                        }
                                        required={true}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center items-center w-full mt-6">
                            <Button onClick={addEducation}>
                                <img src="/images/admin/add.png" alt="" className="h-8 w-8" />
                            </Button>
                        </div>

                        {/* Experience Section */}
                        <p className="text-lg font-bold">Experience</p>
                        {data.experiences.map((experience, index) => (
                            <div key={index} className="flex gap-20 w-full">
                                <div className="flex flex-col w-[48%] gap-2">
                                    <InputLabel htmlFor={`designation-${index}`}>
                                        Designation
                                    </InputLabel>
                                    <TextInput
                                        id={`designation-${index}`}
                                        type="text"
                                        placeholder="Designation"
                                        value={experience.designation}
                                        onChange={(e) =>
                                            handleExperienceChange(index, "designation", e.target.value)
                                        }
                                        required={true}
                                    />
                                </div>
                                <div className="flex flex-col w-[48%] gap-2">
                                    <InputLabel htmlFor={`hospital-${index}`}>Hospital</InputLabel>
                                    <TextInput
                                        id={`hospital-${index}`}
                                        type="text"
                                        placeholder="Hospital"
                                        value={experience.hospital}
                                        onChange={(e) =>
                                            handleExperienceChange(index, "hospital", e.target.value)
                                        }
                                        required={true}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center items-center w-full mt-6">
                            <Button onClick={addExperience}>
                                <img src="/images/admin/add.png" alt="" className="h-8 w-8" />
                            </Button>
                        </div>
                        {/* Save Button */}
                        <div className="flex justify-center items-center w-full">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#f68b1f] mt-6 rounded-2xl text-white font-bold h-8 w-28 text-center justify-center"
                            >
                                {processing ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
