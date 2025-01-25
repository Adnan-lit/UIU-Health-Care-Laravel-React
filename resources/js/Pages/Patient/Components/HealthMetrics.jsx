import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

//calculate BMI

const calculateBmi = (weight, height) => {
    return (weight / (height / 100) ** 2).toFixed(1);
};
const HealthMetrics = ({health_details,date}) => {
    const [healthDetails, setHealthDetails] = useState(health_details?health_details:{
        weight: 0,
        height: 0,
        heartRate: 0,
        systolic: 0,
        diastolic: 0
    });



    const [bmi, setBmi] = useState(calculateBmi(healthDetails.weight, healthDetails.height));
    const [height, setHeight] = useState(healthDetails.height);
    const [weight, setWeight] = useState(healthDetails.weight);


    const getBmiStatus = () => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "You're Healthy";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    const calculateBmiIndicatorPosition = () =>
        `calc(${((bmi - 15) / (40 - 15)) * 100}%)`;

    return (
        <div className={'flex flex-col items-start bg-[#2a2a2a] w-full rounded-xl p-4 gap-4'}>

            <div className={'flex flex-col items-start h-[10%]'}>
                <h1 className={'text-2xl font-semibold text-white'}>Health Metrics</h1>
                <p className={'text-sm text-gray-300'}>Last Check <span>{formatDistanceToNow(new Date(date?date:new Date()))}</span> Ago</p>
            </div>

            <div className={'flex justify-between mt-4 gap-4  h-[20%] w-full'}>

                <div className={'flex gap-4 w-[50%] justify-center items-center rounded-2xl bg-[#e3e1e1] h-full'}>
                    <div className={''}>
                        <img src={'../images/patient/heart-rate.png'} alt={''} className={'h-16'}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-lg font-semibold text-black'}>Heart Rate</p>
                        <p className={'text-lg font-semibold text-black'}>{healthDetails.heartRate} bpm</p>
                    </div>
                </div>
                <div className={'flex gap-4 w-[50%] justify-center items-center rounded-2xl bg-[#d0fbff] h-full'}>
                    <div className={''}>
                        <img src={'../images/patient/blood-pressure.png'} alt={''} className={'h-12'}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-lg font-semibold text-black'}>Blood Pressure</p>
                        <p className={'text-lg font-semibold text-black'}>{
                            healthDetails.systolic + '/' + healthDetails.diastolic + ' mmHg'
                        }</p>
                    </div>
                </div>

            </div>

            <div className={'flex flex-col items-start w-full p-4 h-[35%] rounded-2xl gap-4 bg-[#4a4949]'}>
                <div className={'flex justify-between w-full'}>
                    <h1 className={'font-semibold text-white'}>Body Mass Index (BMI)</h1>
                    <p className={'text-sm text-green-300'}>{getBmiStatus()}</p>
                </div>
                <p className={'text-lg font-bold text-gray-300'}>{bmi}</p>

                <div className={'flex justify-between text-sm w-full text-gray-400'}>
                    <span>15</span>
                    <span>20</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40</span>
                </div>

                <input
                    type="range"
                    id="bmi-slider"
                    min="15"
                    max="40"
                    step="0.1"
                    value={bmi}
                    onChange={(e) => setBmi(e.target.value)}
                    disabled={true}
                    className="w-full range-slider"
                />

                <style jsx>{`
                    .range-slider {
                        appearance: none;
                        width: 100%;
                        height: 8px;
                        border-radius: 10px;
                        background: linear-gradient(
                            to right,
                            #0099ff 0%,
                            #00ff66 37.5%,
                            #ffff00 62.5%,
                            #ff3300 100%
                        );
                        outline: none;
                        opacity: 0.9;
                        transition: opacity 0.2s;
                    }

                    .range-slider:hover {
                        opacity: 1;
                    }

                    .range-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #fff;
                        border: 2px solid #4a4949;
                        cursor: pointer;
                    }

                    .range-slider::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #fff;
                        border: 2px solid #4a4949;
                        cursor: pointer;
                    }
                `}</style>
            </div>

            <div className={'flex justify-between gap-4  h-[20%] w-full'}>

                <div className={'flex flex-col items-start w-[50%] rounded-2xl bg-[#f8debd] h-full'}>
                    <div className={'flex w-full justify-end mt-3'}>
                        <img src={'../images/patient/height.png'} alt={''} className={'h-6'} />
                    </div>
                    <div className={'flex w-full justify-between mt-2 px-3'}>
                        <p className={'text-lg text-black '}>Height</p>
                        <p className={'text-lg text-black'}>{height} cm</p>
                    </div>
                </div>
                <div className={'flex flex-col items-start w-[50%] rounded-2xl bg-[#d0fbff] h-full'}>
                    <div className={'flex w-full justify-end mt-3'}>
                        <img src={'../images/patient/height.png'} alt={''} className={'h-6'}/>
                    </div>
                    <div className={'flex w-full justify-between mt-2 px-3'}>
                        <p className={'text-lg text-black'}>Weight</p>
                        <p className={'text-lg text-black'}>{weight} kg</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HealthMetrics;
