const { Network, Alchemy } = require("alchemy-sdk");
const { ethers } = require("ethers");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const beaconDepositContractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

const depositEventABI = [
  "event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)"
];

const depositEventInterface = new ethers.Interface(depositEventABI);

function calculateFee(gasUsed, effectiveGasPrice) {
  const feeWei = BigInt(gasUsed) * BigInt(effectiveGasPrice);
  const feeEth = Number(feeWei) / 1e18;
  return feeEth.toFixed(18) + " ETH";
}

async function processTransaction(transaction) {
  try {
    console.log(`Processing transaction: ${transaction.hash}`);

    const transactionReceipt = await alchemy.core.getTransactionReceipt(transaction.hash);
    if (!transactionReceipt) {
      console.log(`No transaction receipt found for hash: ${transaction.hash}`);
      return null;
    }

    const block = await alchemy.core.getBlock(transaction.blockNumber);
    if (!block) {
      console.log(`No block found for number: ${transaction.blockNumber}`);
      return null;
    }

    const logs = transactionReceipt.logs.filter(log => 
      log.address.toLowerCase() === beaconDepositContractAddress.toLowerCase()
    );

    if (logs.length > 0) {
      const fee = calculateFee(transactionReceipt.gasUsed, transactionReceipt.effectiveGasPrice);
      
      const decodedData = depositEventInterface.decodeEventLog("DepositEvent", logs[0].data, logs[0].topics);

      const depositDetails = {
        blockNumber: transactionReceipt.blockNumber,
        blockTimestamp: block.timestamp,
        fee: fee,
        hash: transaction.hash,
        pubkey: decodedData.pubkey,
      };

      console.log(`
        Block Number: ${depositDetails.blockNumber}
        Block Timestamp: ${new Date(depositDetails.blockTimestamp * 1000).toISOString()}
        Fee: ${depositDetails.fee}
        Hash: ${depositDetails.hash}
        Pubkey: ${depositDetails.pubkey}
      `);

      return depositDetails;
    } else {
      console.log(`No relevant logs found for transaction: ${transaction.hash}`);
    }
  } catch (error) {
    console.error("Error processing transaction:", error);
  }

  return null;
}

async function startListening() {
  const ws = alchemy.ws;

  ws.on({ method: 'alchemy_pendingTransactions' }, async (transaction) => {
    if (transaction.to && transaction.to.toLowerCase() === beaconDepositContractAddress.toLowerCase()) {
      await processTransaction(transaction);
    }
  });

  console.log("Listening for new transactions...");
}

startListening();
