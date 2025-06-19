import React, { useState } from 'react'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AddVitalsModal from './AddVitalsModal';
import moment from 'moment';

const CardTracker = ({ title, value, label, date, icon, labelIcon, color, name, unit, vitalsOnDate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const avgValue = () => {
        if (name === 'pressure') {
            const total = vitalsOnDate?.reduce((tot, curr) => {
                tot[0] += curr['systolic'];
                tot[1] += curr['diastolic'];
                return tot
            }, [0,0])
            return `${(total[0]/vitalsOnDate?.length).toFixed(2)}/${(total[1]/vitalsOnDate?.length).toFixed(2)}`
        } else {
            const total = vitalsOnDate?.reduce((tot, curr) => {
                return tot + curr[name]
            }, 0)
            return `${(total/vitalsOnDate?.length).toFixed(2)}`
        }
    }
    return (
        <>
            <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center w-4/5">
                {/* header */}
                <div className='flex flex-row justify-start align-center w-full border-b-2 pb-1 border-gray-300'>
                    <span>{icon}</span>
                    <strong className={`text-xl font-semibold ml-2 mb-2 ${color ?? ''} text-base`}>{title}</strong>
                </div>
                <div className='flex flex-row justify-start align-center w-full m-2'>
                    <span className='mt-1'>{labelIcon}</span>
                    <div className='ml-2 flex flex-col justify-center align-center'>
                        <strong className={`text-2xl font-bold text-blue-900`}>{avgValue()} <span className={'text-sm'}>{unit}</span></strong>
                        <p className="text-gray-400">{label}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-start align-center w-full m-2'>
                    <span className='mt-1 text-emerald-400'><DateRangeOutlinedIcon /></span>
                    <div className='ml-2 flex flex-col justify-center align-center'>
                        <span className={`text-emerald-400`}>Last Updated Date and Time</span>
                        <p className="text-gray-800">{moment(vitalsOnDate[vitalsOnDate.length-1].date).format("MM/DD/YYYY, h:mm A")}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-white border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white w-full mt-4">
                    Track Progress
                </button>
            </div>
            <AddVitalsModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default CardTracker
