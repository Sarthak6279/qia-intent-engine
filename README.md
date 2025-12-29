# QIA Intent Engine

Real-time intent scoring infrastructure for Web3 dApps that tracks user behavior and triggers on-chain actions for high-intent users.

## 🌟 Overview

The QIA Intent Engine analyzes user interactions (wallet connections, button clicks, scroll depth, hesitation patterns) and assigns intent scores (30/55/70/85). When a user reaches the high-intent threshold (85), the system can automatically trigger smart contract actions.

## 🏗️ Architecture

- **Backend**: Node.js + Express API with intent scoring engine
- **Frontend**: Vanilla JavaScript demo with real-time score display
- **SDK**: Lightweight tracking library (`qia-sdk.js`)
- **Smart Contract**: Solidity-based intent trigger contract
- **Blockchain**: Ethereum-compatible (configurable RPC)

## 📋 Features

- ✅ Real-time behavior tracking
- ✅ Discrete intent scoring (30/55/70/85)
- ✅ API key authentication
- ✅ Smart contract integration with ethers.js
- ✅ Mock mode for testing without blockchain
- ✅ Interactive demo interface

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Ethereum wallet with testnet funds (for blockchain mode)
- RPC endpoint (Infura, Alchemy, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sarthak6279/qia-intent-engine.git
cd qia-intent-engine
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the backend server:
```bash
node server.js
```

5. Open the demo: Navigate to `http://localhost:3000/`

## 🎮 Demo Usage

1. **Connect Wallet**: Click "Connect wallet" to simulate a wallet connection event
2. **Confirm Swap**: Click "Confirm swap" to simulate a transaction confirmation
3. **View Score**: Watch the "Latest QIA signal" chip update with intent scores
4. **High Intent**: When score reaches 85, see "high intent user" label and blockchain trigger info

## 📚 API Endpoints

### POST /track
Track user behavior and calculate intent score.

**Headers:**
- `x-api-key`: Your QIA API key

**Body:**
```json
{
  "event": "wallet_connect",
  "delay": 5,
  "scrollDepth": 75,
  "pageId": "swap-page"
}
```

**Response:**
```json
{
  "intentScore": 85,
  "trigger": true,
  "timestamp": "2025-12-29T...",
  "blockchain": {
    "txHash": "0x...",
    "network": "mainnet"
  }
}
```

### POST /generate-key
Generate a new API key for a company.

### GET /health
Health check endpoint.

## 🔐 Security Notes

- Never commit `.env` files with real private keys
- Use testnet for development and demos
- Implement rate limiting for production
- Store API keys in a database (not in-memory) for production

## 📦 Project Structure

```
qia-intent-engine/
├── backend/
│   ├── server.js          # Express API + scoring logic
│   └── package.json
├── demo/
│   └── index.html         # Frontend demo interface
├── sdk/
│   └── qia-sdk.js         # Client-side tracking library
├── smart-contract/
│   └── IntentTrigger.sol  # Solidity contract
├── .gitignore
├── .env.example
└── README.md
```

## 🔗 Technology Stack

- **Backend**: Node.js, Express.js
- **Blockchain**: ethers.js v6, Solidity
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: API key-based

## 📝 Future Improvements

- [ ] Database integration for API keys and tracking history
- [ ] Advanced ML-based scoring models
- [ ] Multi-chain support
- [ ] Rate limiting and caching
- [ ] Dashboard for analytics
- [ ] WebSocket for real-time updates

## 📄 License

MIT License

## 👤 Author

Sarthak - [GitHub Profile](https://github.com/Sarthak6279)

---

**Ready to deploy?** For production deployment on Render, Heroku, or AWS, configure your real RPC endpoint and smart contract address in the `.env` file.
