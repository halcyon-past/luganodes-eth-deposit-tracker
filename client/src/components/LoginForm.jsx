import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("username:", username);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { "username": username });
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;
