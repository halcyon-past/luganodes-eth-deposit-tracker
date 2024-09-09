import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="loginForm">
            <form className="formDesign" onSubmit={handleLogin}>
            <h1>Eth-Deposit Tracker</h1>
                <div class="inputName">
                    <label htmlFor="username">Hello User, enter your name</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
