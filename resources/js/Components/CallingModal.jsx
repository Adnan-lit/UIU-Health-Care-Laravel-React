import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function CallingModal({ isOpen, onClose, consultationID }) {
    const callingTone = useRef(null); // Using useRef to persist the audio object
    const [audioBlocked, setAudioBlocked] = useState(false); // State to handle blocked audio

    console.log("Consultation ID from modal:", consultationID);

    useEffect(() => {
        if (isOpen) {
            // Initialize the ringtone audio
            callingTone.current = new Audio('../assets/ringtone.mp3'); // Path to your calling tone file

            // Attempt to play the audio
            callingTone.current
                .play()
                .catch(() => setAudioBlocked(true)); // Set state if autoplay fails
        }

        // Cleanup: Stop and reset the audio when the modal is closed
        return () => {
            if (callingTone.current) {
                callingTone.current.pause();
                callingTone.current.currentTime = 0; // Reset audio to the start
            }
        };
    }, [isOpen]);

    const handleAnswer = (consultationID) => {
        if (callingTone.current) {
            callingTone.current.pause(); // Stop ringtone when answering
            callingTone.current.currentTime = 0; // Reset the audio to the beginning
        }

        // Redirect to the video call page
        router.get(`/patient/consultation/${consultationID}`);

        onClose(); // Close the modal
    };

    const handleReject = () => {
        if (callingTone.current) {
            callingTone.current.pause(); // Stop ringtone when rejecting
            callingTone.current.currentTime = 0; // Reset the audio to the beginning
        }

        onClose(); // Close the modal
    };

    // If the modal is not open, return null to prevent rendering
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold">Incoming Call</h2>
                <p className="mt-2">You have a new call. Would you like to answer?</p>

                {/* Display button to enable audio if autoplay is blocked */}
                {audioBlocked && (
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                callingTone.current
                                    .play()
                                    .then(() => setAudioBlocked(false)) // Reset state once audio is playing
                                    .catch((error) => console.error("Failed to play audio:", error));
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Enable Audio
                        </button>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Reject
                    </button>
                    <button
                        onClick={
                            () => handleAnswer(consultationID) // Pass the consultation ID as an argument
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        Answer
                    </button>
                </div>
            </div>
        </div>
    );
}
