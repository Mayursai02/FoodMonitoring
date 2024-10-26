// frontend/src/components/Measurements.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Measurements.css'; // Import the CSS file

const Measurements = () => {
    const [sensorData, setSensorData] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

    // Define threshold values
    const temperatureThreshold = 37;
    const methaneThreshold = 1000;
    const alcoholThreshold = 200;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/measurements');
            let data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            data = data[randomIndex]
            setSensorData(data);

            // Check if any measurement exceeds thresholds and set alerts
            const newAlerts = [];
            if (data.temperature < temperatureThreshold) {
                newAlerts.push('Temperature exceeds the threshold!');
            }
            if (data.methane > methaneThreshold) {
                newAlerts.push('Methane exceeds the threshold!');
            }
            if (data.alcohol > alcoholThreshold) {
                newAlerts.push('Alcohol exceeds the threshold!');
            }
            setAlerts(newAlerts);
        };

        fetchData();
    }, []);

    if (!sensorData) return <div className="loading">Loading...</div>;

    return (
        <div className="measurements-container">
            <div className="measurements-box">
                <h2>Measurements</h2>
                <p>Temperature: {sensorData.temperature} °C</p>
                <p>Methane: {sensorData.methane} ppm</p>
                <p>Alcohol: {sensorData.alcohol} ppm</p>

                {alerts.length > 0 && (
                    <div>
                        <button
                            onClick={() => navigate('/alert', { state: { alerts } })}
                            className="alert-button"
                        >
                            View Alerts
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Measurements;
