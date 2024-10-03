# airdrop
JavaScript to interact with Stellar's APIs using the Stellar SDK

We will be working on a sub-domain of real8.org: https://api.real8.org

Creating an airdrop for a Stellar-based token like **REAL8** involves interacting with the Stellar network. JavaScript is indeed a good choice for this because it allows us to easily interact with Stellar's APIs using the Stellar SDK.

Below is an outline of the files and key components we’ll need to create an airdrop mechanism for your REAL8 token. 

### Pre-requisites:
1. **Stellar SDK for JavaScript:** This SDK is necessary to interact with the Stellar network.
2. **Node.js** installed to run the JavaScript code.

### Steps to Code the Airdrop:

#### 1. **Install Stellar SDK and Dependencies**

In your project directory, run:

```bash
npm init -y
npm install stellar-sdk axios
```

This will install the Stellar SDK and `axios`, which we will use for API requests.

#### 2. **Configure Environment Variables**

Store sensitive information (like secret keys) in environment variables. Create a `.env` file:

```bash
# .env
SECRET_KEY="SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
PUBLIC_KEY="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NETWORK="testnet" # Use "public" for the production
ASSET_CODE="REAL8"
DISTRIBUTION_ACCOUNT="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

#### 3. **Airdrop Script (airdrop.js)**

Create the airdrop JavaScript to distribute REAL8 tokens. 

### Key Code Breakdown:
- **Server and Network:** We set up a connection to the Stellar testnet (or mainnet in production).
- **Asset Definition:** The token (REAL8) is defined as an asset on the Stellar network.
- **Airdrop Functionality:** The `airdropTokens()` function loops through the list of recipients and calls `airdropToAddress()` to send the specified amount of tokens to each address.
- **Signing and Submission:** Each transaction is signed with the distribution account’s secret key and submitted to the Stellar network.

#### 4. **Running the Airdrop**

Run the script using Node.js:

```bash
node airdrop.js
```

### Security Considerations:
- Ensure that the secret key is protected. It should never be hardcoded in the code but stored securely in environment variables or other secure storage systems.
- Test thoroughly using the Stellar testnet before launching on the public network.

### Additional Tasks:
- Fetch the list of recipients from a database or a CSV file, by adding additional logic to the script.
- Add automatic recipient list fetching
- Error handling
- etc.
