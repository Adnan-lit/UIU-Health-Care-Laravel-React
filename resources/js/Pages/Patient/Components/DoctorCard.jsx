import React from 'react';
import {Link} from "@inertiajs/react";

const PopularDoctorCard = ({doctor}) => {
    return (
        <Link href={`/patient/consultation/book/${doctor.doc_id}`} className="flex w-[40%] h-[144px] md:w-[40%] md:h-auto gap-x-2 border border-r-black-100 border-b-black-100 bg-white rounded-lg md:rounded-2xl p-2 md:shadow-none md:border md:border-[#E3E3E3] px-4 py-3 md:gap-x-4 md:hover:border-primary-600 hover:bg-[#f49e2a] hover:shadow-lg cursor-pointer mx-1 mt-3">
            <DoctorImage img={doctor.profile_photo_path}/>
            <DoctorDetails name={doctor.name} educations={JSON.parse(doctor.educations)} experiences={JSON.parse(doctor.experiences)}/>
        </Link>
    );
};

const DoctorImage = ({img}) => {
    return (
        <div className="w-[110px]">
            <div className="w-[72px] h-[96px] md:w-[110px] md:h-[146px] relative rounded-tl-[8px] rounded-tr-lg md:rounded-xl">
                <img
                    alt="doctor-profile-photo"
                    loading="lazy"
                    width="110"
                    height="146"
                    decoding="async"
                    className="w-[72px] h-[96px] rounded-tl-[8px] rounded-tr-lg md:w-[110px] md:h-[146px] md:rounded-xl object-cover"
                    src={img}
                />

            </div>
        </div>
    );
};

const DoctorDetails = ({name,educations, experiences}) => {
    console.log(educations);
    return (
        <div className="w-[176px] md:w-[286px]">
            <div className="h-[80px] md:h-[144px] md:mb-2">
                <p className="font-bold text-xs md:text-base pb-[2px] md:pb-2 truncate">{name}</p>
                <p className="text-xxs md:text-xs pb-0 md:pb-2 h-[28px] md:h-auto overflow-hidden">
                    {educations.map((education) => (
                        <span key={education.degree}>{education.degree} ({education.institution})</span>
                    ))}
                </p>
                <p className="text-xxs md:text-xs pb-0 md:pb-2 h-[28px] md:h-auto overflow-hidden">
                    {experiences.map((experience) => (
                        <span key={experience.designation}>{experience.designation} ({experience.hospital})</span>
                    ))}
                </p>
            </div>
        </div>
    );
};


export default PopularDoctorCard;
