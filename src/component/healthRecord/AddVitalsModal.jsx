/* eslint-disable no-loop-func */
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import GasMeterOutlinedIcon from '@mui/icons-material/GasMeterOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addVitalItem, simulateVitalItem } from '../../redux/slices/vitalSlice';
import SmartAlertModal from './SmartAlertModal';

const AddVitalsModal = ({ isOpen, setIsOpen }) => {
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [bmiData, setBmiData] = useState(null)
    const dispatch = useDispatch();
    const vitalArray = useSelector((state) => state.vital.vitalData);

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
        height: '',
        weight: '',
        temperature: '',
        respirationRate: '',
        systolic: '',
        diastolic: '',
        oxyLevel: '',
        pulse: '',
        bloodGlucose: '',
    })

    // dynamic onChange function of the inputs
    const onChangeInput = (e, key) => {
        setValue((prev => ({ ...prev, [key]: e.target.value - 0 }))) //this minus 0 will convert it to number
    }

    // Submit function for saving the inputs
    const onSubmit = (e) => {
        e.preventDefault();
        const valueCopy = JSON.parse(JSON.stringify(value))
        const date = new Date()
        valueCopy['date'] = date
        valueCopy['day'] = moment(date).format("ddd");
        valueCopy['id'] = vitalArray?.length + 1;
        // dispatch to redux
        dispatch(addVitalItem(valueCopy))
        toast.success("Vitals saved successfully!");
        if (value?.pulse > 120 || value?.systolic > 140 || value?.diastolic > 90 || value?.oxyLevel > 95) {
            setIsOpenAlert(true)
        } else {
            setValue({
                height: '',
                weight: '',
                temperature: '',
                respirationRate: '',
                systolic: '',
                diastolic: '',
                oxyLevel: '',
                pulse: '',
                bloodGlucose: '',
            })
            setIsOpen(false)
        }
    }

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

        let id = vitalArray.length + 1;

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

    const onClose = () => {
        setValue({
            height: '',
            weight: '',
            temperature: '',
            respirationRate: '',
            systolic: '',
            diastolic: '',
            oxyLevel: '',
            pulse: '',
            bloodGlucose: '',
        })
        setIsOpenAlert(false)
        setIsOpen(false)

    }

    //  this functions will create random numbers of the vitals but each number will be nearer to each other
    const randomNear = (base) => {
        return Math.round((base + (Math.random() * 2 - 1) * 3) * 10) / 10;
    }

    const calculateBMI = (wt, ht) => {
        const heightM = ht / 100;
        const bmi = wt / (heightM * heightM);
        const roundedBMI = parseFloat(bmi.toFixed(1));

        let status = "";

        if (roundedBMI < 18.5) {
            status = "Underweight";
        } else if (roundedBMI < 25) {
            status = "Normal weight";
        } else if (roundedBMI < 30) {
            status = "Overweight";
        } else {
            status = "Obese";
        }

        setBmiData({ bmi: roundedBMI, status })
    }

    useEffect(() => {
        if (value?.height && value?.weight) {
            calculateBMI(value?.weight, value?.height)
        }
        else {
            setBmiData(null)
        }
    }, [value])

    return (
        isOpen && (
            <form onSubmit={onSubmit}>
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 h-auto max-h-[80vh] rounded-lg shadow-lg lg:w-9/12">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b pb-3 bg-blue-800 pt-8 pl-8 pr-8">
                            <h2 className="text-lg font-medium text-white">Add New Vitals <span className='text-sm'>{`(for ${moment(new Date).format("DD/MM/YYYY")})`}</span></h2>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:white">&times;</button>
                        </div>
                        {bmiData && <div className='flex justify-evenly'>
                            <span><strong>BMI:</strong> {bmiData?.bmi}</span>
                            <span><strong>Status:</strong> {bmiData?.status}</span>
                        </div>}
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
                            <button type={'button'} onClick={() => {
                                setValue({
                                    height: '',
                                    weight: '',
                                    temperature: '',
                                    respirationRate: '',
                                    systolic: '',
                                    diastolic: '',
                                    oxyLevel: '',
                                    pulse: '',
                                    bloodGlucose: '',
                                }); setIsOpen(false)
                            }} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                            <button type={'button'} onClick={() => simulateVitals()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Simulate</button>
                            <button type={'submit'} className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">Save</button>
                        </div>
                    </div>
                </div>
                <SmartAlertModal isOpen={isOpenAlert} onClose={onClose} vitals={value} />
            </form>
        )
    )
}

export default AddVitalsModal
