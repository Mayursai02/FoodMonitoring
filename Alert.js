// frontend/src/components/Alert.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Alert.css'; // Import the CSS file

const Alert = () => {
    const location = useLocation();
    const alerts = location.state?.alerts || [];
    const navigate = useNavigate();

    return (
        <div className="alert-container">
            <div className="alert-box">
                <h2>!!! Alert !!!!</h2>
                {alerts.length > 0 ? (
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={index}>{alert}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No alerts available</p>
                )}
                <button onClick={() => navigate('/measurements')} className="back-button">
                    Back
                </button>
            </div>
        </div>
    );
};

export default Alert;
