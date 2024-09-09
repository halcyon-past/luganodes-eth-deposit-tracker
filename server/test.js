const { Network, Alchemy } = require("alchemy-sdk");
const { ethers } = require("ethers");

// Alchemy SDK configuration
const settings = {
  apiKey: "Ws8H4w0TPK0vCxF0LcKtANJuwN-fisOQ", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Beacon Deposit Contract address
const beaconDepositContractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

// ABI for the DepositEvent
const depositEventABI = [
  "event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)"
];

// Create an interface to decode the logs
const depositEventInterface = new ethers.Interface(depositEventABI);

function calculateFee(gasUsed, effectiveGasPrice) {
  const feeWei = BigInt(gasUsed) * BigInt(effectiveGasPrice);
  const feeEth = Number(feeWei) / 1e18;
  return feeEth.toFixed(18) + " ETH";
}

async function getDepositDetails(transactionHash) {
  try {
    console.log(`Fetching details for transaction: ${transactionHash}`);
    const transaction = await alchemy.core.getTransactionReceipt(transactionHash);
    if (!transaction) {
      console.log(`No transaction found for hash: ${transactionHash}`);
      return null;
    }

    const block = await alchemy.core.getBlock(transaction.blockNumber);
    if (!block) {
      console.log(`No block found for number: ${transaction.blockNumber}`);
      return null;
    }

    const logs = transaction.logs.filter(log => 
      log.address.toLowerCase() === beaconDepositContractAddress.toLowerCase()
    );

    if (logs.length > 0) {
      const fee = calculateFee(transaction.gasUsed, transaction.effectiveGasPrice);
      
      // Decode the event data
      const decodedData = depositEventInterface.decodeEventLog("DepositEvent", logs[0].data, logs[0].topics);

      return {
        blockNumber: transaction.blockNumber,
        blockTimestamp: block.timestamp,
        fee: fee,
        hash: transactionHash,
        pubkey: decodedData.pubkey
      };
    } else {
      console.log(`No relevant logs found for transaction: ${transactionHash}`);
    }
  } catch (error) {
    console.error("Error in getDepositDetails:", error);
  }

  return null;
}

async function getLatestBeaconDeposits() {
  try {
    console.log("Fetching latest transfers...");
    const transfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: beaconDepositContractAddress,
      category: ["external"],
      maxCount: 10,
      order: "desc"
    });

    console.log(`Found ${transfers.transfers.length} transfers. Processing details...`);

    console.log("Latest 10 deposits in Beacon Deposit Contract:");
    
    for (const transfer of transfers.transfers) {
      const depositDetails = await getDepositDetails(transfer.hash);
      if (depositDetails) {
        console.log(`
          Block Number: ${depositDetails.blockNumber}
          Block Timestamp: ${new Date(depositDetails.blockTimestamp * 1000).toISOString()}
          Fee: ${depositDetails.fee}
          Hash: ${depositDetails.hash}
          Pubkey: ${depositDetails.pubkey}
        `);
      }
    }
  } catch (error) {
    console.error("Error fetching deposits:", error);
  }
}

getLatestBeaconDeposits();
