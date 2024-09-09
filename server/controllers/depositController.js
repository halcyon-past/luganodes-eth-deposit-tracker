const { Network, Alchemy } = require("alchemy-sdk");
const Deposit = require('../models/Deposit');
const logger = require('../utils/logger');

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
const alchemy = new Alchemy(settings);
const beaconContractAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

const trackDeposits = async (req, res) => {
    try {
        const latestBlock = await alchemy.core.getBlockWithTransactions('latest');
        const deposits = [];

        for (let i = 0; i < latestBlock.transactions.length; i++) {
            const tx = latestBlock.transactions[i];
            if (tx.to === beaconContractAddress) {
                const deposit = new Deposit({
                    blockNumber: tx.blockNumber,
                    blockTimestamp: latestBlock.timestamp,
                    fee: web3.utils.fromWei(tx.gasPrice, 'ether'),
                    hash: tx.hash,
                    pubkey: tx.input,
                });
                await deposit.save();
                deposits.push(deposit);
            }
        }

        res.json({ success: true, deposits });
    } catch (error) {
        logger.error(`Error tracking deposits: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find().sort({ blockNumber: -1 });
        res.json({ success: true, deposits });
    } catch (error) {
        logger.error(`Error fetching deposits: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const addDeposit = async (req, res) => {
    try {
        const { blockNumber, blockTimestamp, fee, hash, pubkey } = req.body;

        if (!blockNumber || !blockTimestamp || !fee || !hash || !pubkey) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newDeposit = new Deposit({
            blockNumber,
            blockTimestamp,
            fee,
            hash,
            pubkey
        });

        await newDeposit.save();

        res.status(201).json({ message: 'Deposit added successfully', deposit: newDeposit });
    } catch (error) {
        console.error('Error adding deposit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { trackDeposits, getDeposits, addDeposit };
