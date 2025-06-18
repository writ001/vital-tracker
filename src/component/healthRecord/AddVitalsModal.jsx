import React, { useEffect, useState } from 'react'
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import GasMeterOutlinedIcon from '@mui/icons-material/GasMeterOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addVitalItem } from '../../redux/slices/vitalSlice';

const AddVitalsModal = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.vital);
    useEffect(() => {
        console.log({items})
    }, [items])
    const vitals = [
        { label: "Height", unit: "cm", icon: <HeightOutlinedIcon />, name: "height" },
        { label: "Weight", unit: "kg", icon: <GasMeterOutlinedIcon />, name: "weight" },
        { label: "Temperature", unit: "°F", icon: <DeviceThermostatOutlinedIcon />, name: "temperature" },
        { label: "Respiration Rate", unit: "breaths/min", icon: <AirOutlinedIcon />, name: "respirationRate" },
        { label: "Blood Pressure(SYS)", unit: "mmHg", icon: <WaterDropOutlinedIcon />, name: "systolic" },
        { label: "Blood Pressure(DIA)", unit: "mmHg", icon: <WaterDropOutlinedIcon />, name: 'diastolic' },
        { label: "Pulse Ox.", unit: "%", icon: <MasksOutlinedIcon />, name: 'oxyLevel' },
        { label: "Heart Rate", unit: "Beats/min", icon: <MonitorHeartOutlinedIcon />, name: 'pulse' },
        { label: "Blood Glucose", unit: "mg/dL", icon: <WaterDropOutlinedIcon />, name: "bloodGlucose" },
    ]

    const [value, setValue] = useState({
        height: null,
        weight: null,
        temperature: null,
        respirationRate: null,
        systolic: null,
        diastolic: null,
        pulse: null,
        bloodGlucose: null,
    })

    const onChangeInput = (e, key) => {
        setValue((prev => ({ ...prev, [key]: e.target.value })))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const valueCopy = JSON.parse(JSON.stringify(value))
        const date = new Date()
        valueCopy['date'] = date
        valueCopy['day'] = moment(date).format("ddd");
        console.log({ valueCopy });
        dispatch(addVitalItem(valueCopy))
        setIsOpen(false)
    }
    return (
        isOpen && (
            <form onSubmit={onSubmit}>
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 h-auto max-h-[80vh] rounded-lg shadow-lg lg:w-9/12">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b pb-3 bg-blue-800 pt-8 pl-8 pr-8">
                            <h2 className="text-lg font-medium text-white">Add New Vitals</h2>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:white">&times;</button>
                        </div>
                        {/* Modal Body */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-h-[50vh] lg:max-h-[60vh] overflow-y-scroll">
                            {vitals.map((vital, index) => (
                                <div className='flex flex-col' key={index}>
                                    <span className='flex  align-center'>
                                        <span className='flex items-center justify-center w-10 h-10 bg-blue-100 text-gray-400 rounded-full'>{vital?.icon}</span>
                                        <span className='text-center ml-2 mt-2'>{vital?.label}<span className='text-red-500'>*</span></span>
                                    </span>
                                    <div className="flex items-center border rounded-md bg-white shadow-md mt-2">
                                        <input
                                            type="number"
                                            value={value[vital.name]}
                                            onChange={(e) => { onChangeInput(e, vital.name) }}
                                            name={vital?.name}
                                            placeholder={`Enter ${vital.label}`}
                                            className="w-full border-none focus:ring-0 p-2"
                                            required
                                        />
                                        <span className="ml-2 bg-gray-100 text-gray-600 p-2">{vital.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-5 flex justify-end space-x-4 pl-8 pr-8 pb-8">
                            <button type={'button'} onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                            <button type={'button'} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Simulate</button>
                            <button type={'submit'} className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    )
}

export default AddVitalsModal
