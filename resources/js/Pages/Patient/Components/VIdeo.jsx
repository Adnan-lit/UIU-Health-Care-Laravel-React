import React, {useState} from 'react';
import AgoraUIKit from 'agora-react-uikit';
import {Link} from "@inertiajs/react";

const Video = ({id,name}) => {
    const [videoCall, setVideoCall] = useState(true);
    const isHost = true;
    const rtcProps = {
        appId: '7ac8fd57b5ef4b3b910c10c6025bbfa0',
        channel: id, // your agora channel
        token: null, // use null or skip if using app in testing mode
        layout: 1,
        enableScreensharing: true,
    };
    const rtmProps={
        username: name,
        displayUsername: true
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <div style={styles.container}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={rtmProps}
                        styleProps={
                            {
                                localBtnContainer: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 50,
                                    width: '40%',
                                    position: 'absolute',
                                    bottom: '8%',
                                    left: '30%',
                                    backgroundColor: 'rgba(0,0,0,0.3)', // Transparent white for the glass effect
                                    borderRadius: 15, // Smooth rounded corners
                                    borderWidth: 1, // Subtle frosted border
                                    borderColor: 'rgba(255, 255, 255, 0.5)', // Light border for a glassy effect
                                    shadowColor: '#000', // Shadow for depth
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 6,
                                    elevation: 5, // For Android shadows
                                    overflow: 'hidden', // Ensures content stays within rounded borders
                                },
                                pinnedVideoContainer: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    gap: 20,
                                    padding: 10,
                                    position: 'relative',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white for glass effect
                                    borderRadius: 15, // Smooth rounded corners
                                    borderWidth: 1, // Light frosted border
                                    borderColor: 'rgba(255, 255, 255, 0.3)', // Subtle border color
                                    shadowColor: '#000', // Shadow color for depth
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 6,
                                    elevation: 5, // For Android shadows
                                    overflow: 'hidden', // Ensures content stays within rounded corners
                                },
                                maxViewContainer: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    gap: 20,
                                    border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle frosted border
                                    borderRadius: 10, // Smooth rounded edges
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white for glass effect
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow for depth
                                    backdropFilter: 'blur(10px)', // Blur effect for glassmorphism
                                    WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
                                    overflow: 'hidden', // Ensures content stays within rounded borders
                                },
                                UIKitContainer: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    gap: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white for the glass effect
                                    borderRadius: 15, // Smooth rounded corners
                                    borderWidth: 1, // Subtle border for the frosted look
                                    borderColor: 'rgba(255, 255, 255, 0.3)', // Transparent border
                                    shadowColor: '#000', // Shadow for depth
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 5, // For Android shadows
                                    overflow: 'hidden', // Clip content to the rounded border
                                    position: 'relative', // Required for BlurView placement
                                },
                                BtnTemplateStyles: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for glass effect
                                    color: 'white',
                                    padding: 10,
                                    borderRadius: 10,
                                    backdropFilter: 'blur(10px)', // Adds blur effect to the background for the frosted glass effect
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
                                    border: 'none', // Optional: Removes the default border for a cleaner look
                                    cursor: 'pointer', // Optional: Changes the cursor to a pointer on hover
                                    transition: 'background-color 0.3s ease', // Optional: Smooth background color transition for hover effect
                                },
                                // customIcon: {
                                //     mic: "https://cdn-icons-png.flaticon.com/512/8705/8705412.png"
                                // },

                                maxViewOverlayContainer: { display: 'none' },
                                maxViewStyles: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for a darker glass effect
                                    padding: 10, // Maintains the existing padding
                                    borderRadius: 10, // Smooth rounded edges for a polished look
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
                                    backdropFilter: 'blur(10px)', // Blur effect for the glassmorphic style
                                    WebkitBackdropFilter: 'blur(10px)', // Safari compatibility for the blur effect
                                    border: '1px solid rgba(255, 255, 255, 0.2)', // Adds a frosted border for detail
                                },
                                localBtnStyles: {
                                    muteLocalAudio: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for glass effect
                                        color: 'black', // Neutral text color
                                        padding: 10,
                                        borderRadius: 10,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
                                        backdropFilter: 'blur(8px)', // Frosted glass effect
                                        WebkitBackdropFilter: 'blur(8px)', // Safari compatibility
                                        border: '1px solid rgba(255, 255, 255, 0.3)', // Light border for glass look
                                    },
                                    muteLocalVideo: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 10,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                    },
                                    switchCamera: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 10,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                    },
                                    endCall: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 10,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                    },
                                    screenshare: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 10,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                    },
                                },
                                scrollViewContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'absolute',bottom:25,right:40, overflow:'hidden', overflowY: 'hidden', width: '20%',height: 'fit-content'},
                                minViewContainer: { display: 'flex', flexDirection: 'column', padding: 5, borderRadius: 20, overflow: 'hidden'},
                                minViewStyles: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white for glass effect
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.3)', // Subtle border for a frosted look
                                    overflow: 'hidden', // Ensures child elements are clipped to rounded corners
                                    backdropFilter: 'blur(10px)', // This works for web environments
                                    shadowColor: '#000', // Shadow for depth
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 5, // For Android shadow
                                },
                                videoMode: {
                                    max: 'cover',
                                    min: 'cover'
                                },
                                usernameText: {
                                    color: 'black',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background for glassmorphism
                                    padding: 5,
                                    borderRadius: 5,
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    height: 'fit-content',
                                    width: 'fit-content',
                                    backdropFilter: 'blur(8px)', // Adds blur effect to the background for glassmorphism
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
                                }

                            }
                        }


            />
        </div>
    ) : (
        <div className={'flex flex-col h-full justify-center items-center gap-5'}>
            <h1 className="text-2xl font-bold text-center text-orange-500 ">Call Ended</h1>
            <button
                onClick={
                    () => {
                        //go back
                        window.history.back();

                    }
                }
                className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Consultation
            </button>

        </div>
    );
};

const styles = {
    container: { width: '100%', height: '80vh', display: 'flex', backgroundColor: '#fff' },
    heading: { textAlign: 'center', marginBottom: 0 },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 },
    nav: { display: 'flex', justifyContent: 'space-around' },
    btn: { backgroundColor: 'red', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
}

export default Video;
