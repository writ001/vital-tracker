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
import { useDispatch, useSelector } from 'react-redux';
import AddVitalsModal from './AddVitalsModal';
import { setPage, simulateVitalItem } from '../../redux/slices/vitalSlice';
import { toast } from 'react-toastify';
const HealthRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVital, setIsOpenVital] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [vitalsOnDate, setVitalsOnDate] = useState([]);
  const allVitalData = useSelector((state) => state.vital.vitalData);
  const dispatch = useDispatch();  
  
    useEffect(() => {
      dispatch(setPage('Health Record'))
    }, [])


  const [cardData, setCardData] = useState([
    {
      title: 'Heart Rate',
      color: 'text-blue-600',
      value: '20 bpm',
      label: 'Avg. daily heart beat',
      date: '10/01/2023, 6:30 PM',
      icon: <FavoriteIcon className='text-blue-600' />,
      labelIcon: <MonitorHeartOutlinedIcon />,
      name: 'pulse',
      unit: 'Bpm',
    },
    {
      title: 'Blood Pressure',
      color: 'text-emerald-400',
      value: '120/110',
      label: 'Avg. blood pressure',
      date: '10/01/2023, 6:30 PM',
      icon: <AddToQueueOutlinedIcon className='text-emerald-400' />,
      labelIcon: <TireRepairOutlinedIcon />,
      name: 'pressure',
      unit: 'mmHg',
    },
    {
      title: 'Temperature',
      color: 'text-blue-900',
      value: '96.5',
      label: 'Avg. daily temperature',
      date: '10/01/2023, 6:30 PM',
      icon: <DeviceThermostatOutlinedIcon className='text-blue-900' />,
      labelIcon: <ThermostatAutoOutlinedIcon />,
      name: 'temperature',
      unit: '°F',
    },
    {
      title: 'Blood Sugar',
      color: 'text-blue-600',
      value: '100',
      label: 'Avg. daily blood sugar',
      date: '10/01/2023, 6:30 PM',
      icon: <TabletAndroidOutlinedIcon className='text-blue-600' />,
      labelIcon: <WaterDropOutlinedIcon />,
      name: 'bloodGlucose',
      unit: 'mg/dL',
    },
    {
      title: 'Oxy Level',
      color: 'text-emerald-400',
      value: '110',
      label: 'Avg. Oxy level',
      date: '10/01/2023, 6:30 PM',
      icon: <PropaneTankOutlinedIcon className='text-emerald-400' />,
      labelIcon: <MasksOutlinedIcon />,
      name: 'oxyLevel',
      unit: '%',
    },
    {
      title: 'Respiration Rate',
      color: 'text-blue-900',
      value: '112',
      label: 'Avg. respiration rate',
      date: '10/01/2023, 6:30 PM',
      icon: <AirOutlinedIcon className='text-blue-900' />,
      labelIcon: <AirOutlinedIcon />,
      name: 'respirationRate',
      unit: 'bpm',
    },
    {
      title: 'Weight',
      color: 'text-blue-600',
      value: '85 Kgs',
      label: 'Avg. daily weight',
      date: '10/01/2023, 6:30 PM',
      icon: <SpeedOutlinedIcon className='text-blue-600' />,
      labelIcon: <SpeedOutlinedIcon />,
      name: 'weight',
      unit: 'Kgs',
    },
  ])

  // Simulate function to simulate the vitals data of last 3 days
  const simulateVitals = () => {
    const data = [];
    // these are the base value to keep reference to have a realistic data set
    const baseValues = {
      height: 175,
      weight: 90,
      temperature: 94.5,
      respirationRate: 20,
      systolic: 120,
      diastolic: 90,
      oxyLevel: 80,
      pulse: 70,
      bloodGlucose: 100,
    };
    // this is required to simulate the records at the below mentioned time of each day for the last 3 days
    const timeSlots = [
      { hour: 7, minute: 0 },
      { hour: 14, minute: 0 },
      { hour: 18, minute: 0 }
    ];

    let id = allVitalData.length + 1;

    // this will start loop which will create data for the last 3 days. it will create 3 data for each day at different time solts
    for (let startDay = 3; startDay >= 1; startDay--) {
      timeSlots.forEach(({ hour, minute }) => {
        const date = new Date();
        date.setDate(date.getDate() - startDay);
        date.setHours(hour, minute, 0, 0);

        data.push({
          id: id++,
          height: randomNear(baseValues.height),
          weight: randomNear(baseValues.weight),
          temperature: randomNear(baseValues.temperature),
          respirationRate: randomNear(baseValues.respirationRate),
          systolic: randomNear(baseValues.systolic),
          diastolic: randomNear(baseValues.diastolic),
          oxyLevel: randomNear(baseValues.oxyLevel),
          pulse: randomNear(baseValues.pulse),
          bloodGlucose: randomNear(baseValues.bloodGlucose),
          date,
          day: moment(date).format("ddd"),
        });
      });
    }

    // Adding the 10th object with current current date & time
    const now = new Date();
    data.push({
      id: id++,
      height: randomNear(baseValues.height),
      weight: randomNear(baseValues.weight),
      temperature: randomNear(baseValues.temperature),
      respirationRate: randomNear(baseValues.respirationRate),
      systolic: randomNear(baseValues.systolic),
      diastolic: randomNear(baseValues.diastolic),
      oxyLevel: randomNear(baseValues.oxyLevel),
      pulse: randomNear(baseValues.pulse),
      bloodGlucose: randomNear(baseValues.bloodGlucose),
      date: now,
      day: moment(now).format("ddd")
    });
    // dispatching to redux
    dispatch(simulateVitalItem(data))
    toast.success("Last 3 days of Vitals Data got simulated. You can change the date to check for the last 3 days");
    setIsOpen(false)
  }

  //  this functions will create random numbers of the vitals but each number will be nearer to each other
  const randomNear = (base) => {
    return Math.round((base + (Math.random() * 2 - 1) * 3) * 10) / 10;
  }

  // this useEffect is used for filter the vitals data on specific date selected
  useEffect(() => {
    const specificVitalData = allVitalData.filter((item, idx) => {

      if (moment(selectedDate).format("DD/MM/YYYY") === moment(item.date).format("DD/MM/YYYY")) {
        return item
      }
    })

    setVitalsOnDate(specificVitalData)
  }, [selectedDate, allVitalData])

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
      <div className='flex flex-col justify-center align-center md:flex-row md:justify-between items-center'>
        {
          moment(selectedDate).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY") && <button
            onClick={() => setIsOpenVital(true)}
            className="bg-white border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white sm:w-1/5 mt-4">
            Track Progress
          </button>
        }
        {
          moment(selectedDate).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY") && <button
            onClick={() => simulateVitals()}
            className="hover:bg-white border-2 border-blue-600 hover:text-blue-600 py-2 px-4 rounded-md bg-blue-600 text-white sm:w-1/5 mt-4">
            Simulate Vitals
          </button>
        }
      </div>
      {
        vitalsOnDate?.length === 0 && <div className='text-center text-lg text-gray-700 mt-8'>No Data is present for the specific date</div>
      }
      {vitalsOnDate?.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {
          cardData?.map((item, idx) => (
            <CardTracker
              key={idx}
              name={item?.name}
              title={item?.title}
              value={item?.value}
              label={item?.label}
              date={item?.date}
              color={item?.color}
              icon={item?.icon}
              unit={item?.unit}
              labelIcon={item?.labelIcon}
              vitalsOnDate={vitalsOnDate}
            />
          ))
        }
      </div>}

      <AddVitalsModal isOpen={isOpenVital} setIsOpen={setIsOpenVital} />
      <DatePickerModal isOpen={isOpen} setIsOpen={setIsOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </>
  )
}

export default HealthRecord
