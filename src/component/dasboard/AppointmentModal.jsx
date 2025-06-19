import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

const AppointmentModal = ({ isOpen, setIsOpen, selectedDate, setSelectedDate, selectedTime,
    setSelectedTime, selectedPeriod, setSelectedPeriod, selectedName, setSelectedName }) => {
    const [date, setDate] = useState(selectedDate)
    const [time, setTime] = useState(selectedTime)
    const [period, setPeriod] = useState(selectedPeriod)
    const [name, setName] = useState(selectedName)
    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                    <h2 className="text-lg font-medium mb-4 text-gray-700">Appointment</h2>
                    <div>
                        <label htmlFor="memberProfile" className="block text-sm font-medium text-blue-700">
                            Doctor's name
                        </label>
                        <select value={name} onChange={(e) => { setName(e.target.value) }} id="memberProfile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option>Dr. Nishant Aggarwal</option>
                            <option>Dr. Aishwariya Aggarwal</option>
                            <option>Dr. Dilip Rathod</option>
                            <option>Dr. Nirupom Sen</option>
                        </select>
                    </div>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        className="w-full border border-gray-300 p-2 rounded-md mt-2"
                        dateFormat="dd/MM/yyyy"
                    />
                    <div className="flex gap-2 mt-2">
                        {/* Hour:Minute Dropdown */}
                        <select
                            className="border p-2 rounded w-28"
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                        >
                            {["6", "7", "8", "9", "10", "11"].map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>

                        {/* AM/PM Selector */}
                        <select
                            className="border p-2 rounded w-20"
                            value={period}
                            onChange={(e) => {
                                setPeriod(e.target.value);
                            }}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => { setSelectedDate(date); setSelectedName(name); setSelectedTime(time); setSelectedPeriod(period) ;setIsOpen(false); }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default AppointmentModal
