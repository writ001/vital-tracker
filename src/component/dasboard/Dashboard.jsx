import React, { useState } from 'react'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChartAndData from './ChartAndData';
const Dashboard = () => {

  const [packageSelect, setPackageSelect] = useState('')
  const packages = [
    {
      title: "Heart Health package",
      icon: '/svg/heart.svg',
      expiry: "20-01-2023",
      bgColor: "bg-violet-100",
    },
    {
      title: "Diabetic Care package",
      icon: "/svg/blister-pills_round_x1.svg",
      expiry: "20-01-2023",
      bgColor: "bg-blue-100",
    },
    {
      title: "Ortho Care package",
      icon: "/svg/orthopaedics.svg",
      expiry: "20-01-2023",
      bgColor: "bg-fuchsia-100",
    },
  ];

  return (
    <>
      {/* Dropdown row */}
      <div className="grid grid-rows-1 gap-2 p-3 rounded-lg w-96">
        <div className="grid grid-cols-2 gap-4">
          {/* Member Profile Dropdown */}
          <div>
            <label htmlFor="memberProfile" className="block text-sm font-medium text-blue-700">
              Member profile
            </label>
            <select id="memberProfile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Mrs Ananya Singh</option>
            </select>
          </div>
          {/* Care Plans Dropdown */}
          <div>
            <label htmlFor="carePlans" className="block text-sm font-medium text-blue-700">
              Select care plans
            </label>
            <select value={packageSelect} onChange={(e) => setPackageSelect(e.target.value)} id="carePlans" className="mt-1 block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value={''}>Select</option>
              <option value={'Heart Health package'}>Heart Health package</option>
              <option value={'Diabetic Care package'}>Diabetic Care package</option>
              <option value={'Ortho Care package'}>Ortho Care package</option>
            </select>
          </div>
        </div>
      </div>
      {/* Plan list row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-3 rounded-lg">
        {packages.map((pkg, index) => (
          <div key={index} className={`p-4 rounded-lg ${pkg.bgColor} ${!(!packageSelect || pkg?.title === packageSelect) && 'hidden'}`}>
            <div className="flex items-center space-x-4">
              <span className={`text-3xl ${pkg.textColor}`}>
                <img src={pkg?.icon} className="filter invert sepia hue-rotate-180" />
              </span>
              <div>
                <h2 className="text-lg font-bold">{pkg.title}</h2>
                <p>Package expires on <span className="font-bold">{pkg.expiry}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Appointment details row */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        {/* Appointment Info */}
        <div className="flex items-center space-x-3">
          <MedicalServicesIcon color='primary' />
          <span>
            Next Appointment is on{" "}
            <span className="text-blue-600 font-medium">12th Dec at 6 pm</span> with <strong>Dr. Nishant Aggarwal</strong>.
          </span>
        </div>
        {/*Change Button */}
        <button className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Request for change
        </button>
      </div>
      {/* Charts and data */}
      <ChartAndData />
    </>
  )
}

export default Dashboard
