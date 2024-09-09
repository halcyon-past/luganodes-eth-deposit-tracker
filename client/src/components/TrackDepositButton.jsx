import React from 'react';
import axios from 'axios';

const TrackDepositButton = ({ onTrack }) => {
    const handleTrackDeposits = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/deposits/track`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onTrack();
        } catch (error) {
            console.error("Error tracking deposits:", error);
        }
    };

    return (
        <button onClick={handleTrackDeposits}>
            Track Deposits
        </button>
    );
};

export default TrackDepositButton;
