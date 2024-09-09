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
                            <td>{deposit.hash}</td>
                            <td>{deposit.pubkey}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepositTable;
