import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Measurements from './components/Measurements';
import Alert from './components/Alert';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/measurements" element={<Measurements />} />
                <Route path="/alert" element={<Alert />} />
            </Routes>
        </Router>
    );
}

export default App;
