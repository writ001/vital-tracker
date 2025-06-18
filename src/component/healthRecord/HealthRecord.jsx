import React, { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePickerModal from './DatePickerModal';
import moment from 'moment/moment';
import CardTracker from './CardTracker';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import ThermostatAutoOutlinedIcon from '@mui/icons-material/ThermostatAutoOutlined';
import TabletAndroidOutlinedIcon from '@mui/icons-material/TabletAndroidOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import PropaneTankOutlinedIcon from '@mui/icons-material/PropaneTankOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
const HealthRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cardData, setCardData] = useState([
    {
      title: 'Heart Rate',
      color: 'text-blue-600',
      value: '20 bpm',
      label: 'Avg. daily heart beat',
      date: '10/01/2023, 6:30 PM',
      icon: <FavoriteIcon className='text-blue-600' />,
      labelIcon: <MonitorHeartOutlinedIcon />,
    },
    {
      title: 'Blood Pressure',
      color: 'text-emerald-400',
      value: '120/110',
      label: 'Avg. blood pressure',
      date: '10/01/2023, 6:30 PM',
      icon: <AddToQueueOutlinedIcon className='text-emerald-400' />,
      labelIcon: <TireRepairOutlinedIcon />,
    },
    {
      title: 'Temperature',
      color: 'text-blue-900',
      value: '96.5',
      label: 'Avg. daily temperature',
      date: '10/01/2023, 6:30 PM',
      icon: <DeviceThermostatOutlinedIcon className='text-blue-900' />,
      labelIcon: <ThermostatAutoOutlinedIcon />,
    },
    {
      title: 'Blood Sugar',
      color: 'text-blue-600',
      value: '100',
      label: 'Avg. daily blood sugar',
      date: '10/01/2023, 6:30 PM',
      icon: <TabletAndroidOutlinedIcon className='text-blue-600' />,
      labelIcon: <WaterDropOutlinedIcon />,
    },
    {
      title: 'Oxy Level',
      color: 'text-emerald-400',
      value: '110',
      label: 'Avg. Oxy level',
      date: '10/01/2023, 6:30 PM',
      icon: <PropaneTankOutlinedIcon className='text-emerald-400' />,
      labelIcon: <MasksOutlinedIcon />,
    },
    {
      title: 'Respiration Rate',
      color: 'text-blue-900',
      value: '112',
      label: 'Avg. respiration rate',
      date: '10/01/2023, 6:30 PM',
      icon: <AirOutlinedIcon className='text-blue-900' />,
      labelIcon: <AirOutlinedIcon />,
    },
    {
      title: 'Weight',
      color: 'text-blue-600',
      value: '85 Kgs',
      label: 'Avg. daily weight',
      date: '10/01/2023, 6:30 PM',
      icon: <SpeedOutlinedIcon className='text-blue-600' />,
      labelIcon: <SpeedOutlinedIcon />,
    },
  ])

  return (
    <>
      <div className="flex flex-col justify-center sm:flex-row items-center sm:justify-between p-4 w-full">
        <span className="text-lg font-medium text-gray-800">See your Vitals</span>
        {/* Date Picker Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 w-56 bg-white justify-between border border-gray-300 rounded-md hover:bg-gray-200">
          <span>{moment(selectedDate).format("DD/MM/YYYY")}</span>
          <CalendarMonthIcon />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {
          cardData?.map((item, idx) => (
            <CardTracker
              key={idx}
              title={item?.title}
              value={item?.value}
              label={item?.label}
              date={item?.date}
              color={item?.color}
              icon={item?.icon}
              labelIcon={item?.labelIcon}
            />
          ))
        }
      </div>
      <DatePickerModal isOpen={isOpen} setIsOpen={setIsOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </>
  )
}

export default HealthRecord
