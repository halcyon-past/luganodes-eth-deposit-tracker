import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DepositTable from './components/DepositTable';
import TrackDepositButton from './components/TrackDepositButton';
import LoginPage from './pages/LoginPage';
import LogoutButton from './components/LogoutButton';

function App() {
    const [refresh, setRefresh] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleTrack = () => {
        setRefresh(!refresh); // Trigger a re-fetch in DepositTable
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    return (
        <div className="App">
            {isLoggedIn ? (
                <>
                    <TrackDepositButton onTrack={handleTrack} />
                    <DepositTable key={refresh} />
                    <LogoutButton onLogout={handleLogout} />
                </>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}
