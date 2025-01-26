import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function PatientCarousel({ patients, onSelectPatient, selectedPatient }) {
    return (
        <div class="px-2">
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={5}
                navigation
                centeredSlides
                onSlideChange={(swiper) => onSelectPatient(patients[swiper.activeIndex])}
            >
                {patients.map((patient) => (
                    <SwiperSlide key={patient.id} className="px-2">
                        <div
                            className={`flex flex-col items-center cursor-pointer ${
                                selectedPatient.id === patient.id ? "opacity-100" : "opacity-50"
                            }`}
                            onClick={() => onSelectPatient(patient)}
                        >
                            <img
                                src={patient.profile_photo_path || "/images/user.jpg"}
                                alt={patient.name}
                                className="w-16 h-16 rounded-full border-2 border-gray-300"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
