const { Network, Alchemy } = require("alchemy-sdk");
const Deposit = require('../models/Deposit');
const logger = require('../utils/logger');
const { ethers } = require("ethers");

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
const beaconContractAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

const depositEventABI = [
    "event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)"
];

const depositEventInterface = new ethers.Interface(depositEventABI);

function calculateFee(gasUsed, effectiveGasPrice) {
    const feeWei = BigInt(gasUsed) * BigInt(effectiveGasPrice);
    const feeEth = Number(feeWei) / 1e18;
    return feeEth.toFixed(18) + " ETH";
}

const trackDeposits = async (req, res) => {
    logger.info('Tracking deposits...');
    try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();

        const fromBlock = latestBlockNumber - 200;
        const transfers = await alchemy.core.getAssetTransfers({
            fromBlock: `0x${fromBlock.toString(16)}`,
            toBlock: 'latest',
            toAddress: beaconContractAddress,
            category: ["external"],
            maxCount: 10,
            order: "desc"
        });

        const deposits = [];

        for (const transfer of transfers.transfers) {
            const transaction = await alchemy.core.getTransactionReceipt(transfer.hash);
            const block = await alchemy.core.getBlock(transaction.blockNumber);

            const logs = transaction.logs.filter(log => 
                log.address.toLowerCase() === beaconContractAddress.toLowerCase()
            );

            if (logs.length > 0) {
                const decodedData = depositEventInterface.decodeEventLog("DepositEvent", logs[0].data, logs[0].topics);

                const deposit = new Deposit({
                    blockNumber: transaction.blockNumber,
                    blockTimestamp: block.timestamp,
                    fee: calculateFee(transaction.gasUsed, transaction.effectiveGasPrice),
                    hash: transaction.transactionHash,
                    pubkey: decodedData.pubkey,
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
