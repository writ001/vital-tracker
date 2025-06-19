import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const DatePickerModal = ({ isOpen, setIsOpen, selectedDate, setSelectedDate }) => {
    const [date, setDate] = useState(selectedDate)
    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                    <h2 className="text-lg font-medium mb-4 text-gray-700">Select Date</h2>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        maxDate={new Date()}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        dateFormat="dd/MM/yyyy"
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => { setSelectedDate(date); setIsOpen(false); }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
                        >
                            Set
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

export default DatePickerModal
