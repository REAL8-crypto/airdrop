// airdrop.js
require('dotenv').config();
const StellarSdk = require('stellar-sdk');
const axios = require('axios');

// Setup Stellar SDK
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const NETWORK_PASSPHRASE = process.env.NETWORK === "public" 
  ? StellarSdk.Networks.PUBLIC 
  : StellarSdk.Networks.TESTNET;
StellarSdk.Network.use(new StellarSdk.Network(NETWORK_PASSPHRASE));

// Secret and Public Key for your distribution account
const secretKey = process.env.SECRET_KEY;
const distributionAccount = StellarSdk.Keypair.fromSecret(secretKey);
const distributionPublicKey = process.env.PUBLIC_KEY;
const assetCode = process.env.ASSET_CODE;

// Function to create an asset (REAL8)
const asset = new StellarSdk.Asset(assetCode, distributionPublicKey);

// Function to airdrop tokens to a list of recipients
async function airdropTokens(recipients) {
  try {
    for (let recipient of recipients) {
      await airdropToAddress(recipient.address, recipient.amount);
    }
    console.log("Airdrop completed successfully");
  } catch (error) {
    console.error("Error during airdrop:", error);
  }
}

// Function to send tokens to a recipient address
async function airdropToAddress(destination, amount) {
  try {
    // Load the distribution account
    const account = await server.loadAccount(distributionPublicKey);

    // Build the payment transaction
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination,
        asset,
        amount: amount.toString(),
      }))
      .setTimeout(30)
      .build();

    // Sign the transaction with the secret key
    transaction.sign(distributionAccount);

    // Submit the transaction to Stellar network
    const result = await server.submitTransaction(transaction);
    console.log(`Airdropped ${amount} REAL8 to ${destination}:`, result);
  } catch (error) {
    console.error(`Failed to airdrop to ${destination}:`, error);
  }
}

// Example list of recipients (in a real app, load this from a file or database)
const recipients = [
  { address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', amount: 100 },
  { address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', amount: 50 },
];

// Execute airdrop
airdropTokens(recipients);
