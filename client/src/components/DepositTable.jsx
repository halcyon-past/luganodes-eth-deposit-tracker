import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepositTable = () => {
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/deposits`);
                setDeposits(response.data.deposits);
            } catch (error) {
                console.error("Error fetching deposits:", error);
            }
        };

        fetchDeposits();
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard'))
            .catch(() => alert('Failed to copy'));
    };

    const trimValue = (value) => {
        return value.length > 30 ? `${value.slice(0, 30)}...` : value;
    };

    return (
        <div className="depTable">
            <h1>Tracked Deposits</h1>
            <table className="blockTable">
                <thead>
                    <tr>
                        <th>Block Number</th>
                        <th>Timestamp</th>
                        <th>Fee (ETH)</th>
                        <th>Transaction Hash</th>
                        <th>Public Key</th>
                    </tr>
                </thead>
                <tbody>
                    {deposits.map((deposit) => (
                        <tr key={deposit.hash}>
                            <td>{deposit.blockNumber}</td>
                            <td>{new Date(deposit.blockTimestamp).toLocaleString()}</td>
                            <td>{deposit.fee}</td>
                            <td 
                                onClick={() => handleCopy(deposit.hash)}
                                style={{ cursor: 'pointer' }}
                                title={deposit.hash}
                            >
                                {trimValue(deposit.hash)}
                            </td>
                            <td 
                                onClick={() => handleCopy(deposit.pubkey)}
                                style={{ cursor: 'pointer' }}
                                title={deposit.pubkey}
                            >
                                {trimValue(deposit.pubkey)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepositTable;
