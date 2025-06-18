import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const bloodPressureData = [
    { day: 'Mon', systolic: 105, diastolic: 75 },
    { day: 'Tue', systolic: 110, diastolic: 80 },
    { day: 'Wed', systolic: 115, diastolic: 85 },
    { day: 'Thu', systolic: 120, diastolic: 90 },
    { day: 'Fri', systolic: 125, diastolic: 95 },
    { day: 'Sat', systolic: 110, diastolic: 85 },
    { day: 'Sun', systolic: 118, diastolic: 90 },
];

const oxygenData = [
    { pulse: 60, oxyLevel: 98 },
    { pulse: 80, oxyLevel: 97 },
    { pulse: 90, oxyLevel: 96 },
    { pulse: 100, oxyLevel: 97 },
    { pulse: 110, oxyLevel: 98 },
    { pulse: 120, oxyLevel: 99 },
];


const ChartAndData = () => {
    // Systolic min max avg calculation
    const minSystolic = bloodPressureData?.length > 0 ? Math.min(...bloodPressureData.map(d => d.systolic)) : '--';
    const avgSystolic = bloodPressureData?.length > 0 ? Math.round(bloodPressureData.reduce((sum, d) => sum + d.systolic, 0) / bloodPressureData.length) : '--';
    const maxSystolic = bloodPressureData?.length > 0 ? Math.max(...bloodPressureData.map(d => d.systolic)) : '--';

    // Diastolic min max avg calculation
    const minDiastolic = bloodPressureData?.length > 0 ? Math.min(...bloodPressureData.map(d => d.diastolic)) : '--';
    const avgDiastolic = bloodPressureData?.length > 0 ? Math.round(bloodPressureData.reduce((sum, d) => sum + d.diastolic, 0) / bloodPressureData.length) : '--';
    const maxDiastolic = bloodPressureData?.length > 0 ? Math.max(...bloodPressureData.map(d => d.diastolic)) : '--';

    // min SpO2 calculation
    const minSpO2 = oxygenData?.length > 0 ? Math.min(...oxygenData.map(d => d.oxyLevel)) : '--';
    // min pulse raate calculation
    const minPR = oxygenData?.length > 0 ? Math.min(...oxygenData.map(d => d.pulse)) : '--';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,2fr] gap-4 p-3">
            {/* Blood Pressure Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-bold mb-2 text-gray-700">Blood Pressure</h2>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium text-center">
                    {/* Min */}
                    <div>
                        <span className="text-emerald-500 font-bold">{minSystolic} / </span>
                        <span className="text-emerald-500 font-bold">{minDiastolic}</span>
                        <span className="block text-gray-500">Min</span>
                    </div>
                    {/* Avg */}
                    <div>
                        <span className="text-emerald-500 font-bold">{avgSystolic} / </span>
                        <span className="text-emerald-500 font-bold">{avgDiastolic}</span>
                        <span className="block text-gray-500">Avg</span>
                    </div>
                    {/* Max */}
                    <div>
                        <span className="text-emerald-500 font-bold">{maxSystolic} / </span>
                        <span className="text-emerald-500 font-bold">{maxDiastolic}</span>
                        <span className="block text-gray-500">Max</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={bloodPressureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fill: '#555' }} />
                        <YAxis domain={[50, 160]} tick={{ fill: '#555' }} />
                        <Tooltip />

                        {/* Systolic & Diastolic Lines */}
                        <Line type="monotone" dataKey="systolic" stroke="#FF6384" strokeWidth={3} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="diastolic" stroke="#36A2EB" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
                {/* Custom Legend Below */}
                <div className="flex justify-center items-center mt-4 space-x-6">
                    <div className="flex items-center space-x-2">
                        <span className="w-6 h-3 bg-[#FF6384]"></span>
                        <span className="text-gray-700">Systolic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-[#36A2EB]"></span>
                        <span className="text-gray-700">Diastolic</span>
                    </div>
                </div>
            </div>
            {/* pulse and weight data */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {/* Pulse */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <div className='flex justify-end w-full'>
                        <MonitorHeartIcon className='text-pink-500' />
                    </div>
                    <div className='flex flex-col justify-start w-full'>
                        <h2 className="text-lg font-bold mb-2 text-gray-700">Pulse</h2>
                        <p className="text-3xl font-bold text-blue-900">110<span className='text-blue-400 text-sm'>BPM</span></p>
                    </div>
                </div>
                {/* Weight */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <div className='flex justify-end w-full'>
                        <MonitorWeightIcon color='primary' />
                    </div>
                    <div className='flex flex-col justify-start w-full'>
                        <h2 className="text-lg font-bold mb-2 text-gray-700">Weight</h2>
                        <p className="text-3xl font-bold text-blue-900">90.0<span className='text-blue-400 text-sm'>Kgs</span></p>
                    </div>
                </div>
            </div>
            {/* Oxy Level Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-bold mb-2">Oxy Level</h2>
                <div className="flex justify-between mb-6">
                    {/* Min SpO2*/}
                    <div>
                        <span className="text-emerald-500 font-bold">{minSpO2}%</span>
                        <span className="block text-gray-500">Min SpO2</span>
                    </div>
                    {/* Min PR */}
                    <div>
                        <span className="text-emerald-500 font-bold">{minPR}</span>
                        <span className="block text-gray-500">Min PR</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={oxygenData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="pulse" label={{ value: "Pulse Rate", position: "insideBottom", offset: -4 }} />
                        <YAxis domain={[0, 100]} label={{ value: "Percentage Saturation(%)", angle: -90, position: "insideLeft", dy: 80, offset: 20 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="oxyLevel" stroke="#4BC0C0" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartAndData;
