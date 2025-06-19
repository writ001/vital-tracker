import React from "react";

const SmartAlertModal = ({ isOpen, onClose, vitals }) => {
    const alerts = [];

    if (vitals.pulse > 120) {
        alerts.push("⚠️ High Heart Rate");
    }

    if (vitals.oxyLevel < 95) {
        alerts.push("🟠 Low Oxygen Level");
    }

    if (vitals.systolic > 140 || vitals.diastolic > 90) {
        alerts.push("⚠️ High BP");
    }

    const recommendedActions = ["Take rest", "Drink water", "Consult a doctor"];

    return (
        isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Smart Alerts</h2>
                    <button onClick={() => onClose()} className="text-gray-500 hover:text-red-600 text-xl font-bold">&times;</button>
                </div>

                {/* Alerts */}
                {alerts.length > 0 ? (
                    <div className="space-y-2 mb-4">
                        {alerts.map((msg, index) => (
                            <div key={index} className="bg-yellow-100 text-gray-800 p-2 rounded text-sm font-medium">
                                {msg}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-green-600 mb-4">✅ All vitals are within normal range</p>
                )}

                {/* Recommended Actions */}
                {alerts.length > 0 && (
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Recommended Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {recommendedActions.map((action, i) => (
                                <div
                                    key={i}
                                    className="border rounded-md p-2 text-center text-sm text-gray-700 bg-gray-50 hover:bg-gray-100"
                                >
                                    {action}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => onClose()}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default SmartAlertModal;