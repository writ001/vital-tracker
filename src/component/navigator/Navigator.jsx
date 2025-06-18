import React, { useEffect, useState } from 'react'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
const Navigator = () => {
    const navigate = useNavigate()
    const path = window.location.pathname
    const pathNavMap = {
        '/': 1,
        '/health-record': 2,
    }
    const [active, setActive] = useState(path?.slice(1) ?? '')

    //   this useEffect will make the navbar item highlighted based on the route
    useEffect(() => {
        setActive(pathNavMap[path])
    }, [])

    const steps = [
        { id: 1, label: 'Dashboard', icon: <DashboardCustomizeIcon />, to: '/' },
        { id: 2, label: 'Health Records', icon: <MonitorHeartIcon />, to: '/health-record' },
        { id: 3, label: 'My Appointments', icon: <DateRangeIcon />, disabled: true },
        { id: 4, label: 'My Schedule', icon: <CalendarTodayIcon />, disabled: true },
    ];
    // functtion which will help to navigate through the routes
    const navigateTo = (path, label) => {
        setActive(label)
        navigate(path)
    }
    return (
        <div className="w-40 lg:w-fit bg-white shadow-md rounded-lg divide-y pb-8 pt-8 pl-4 pr-4 mr-4 fixed">
            {steps.map((step, index) => (
                <div key={index}
                    className={`pt-4 pb-4 flex items-center ${step?.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${active === step.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                    onClick={() => navigateTo(step.to, step.id)}
                >
                    <span className="ml-2">
                        {step.icon}
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Navigator
