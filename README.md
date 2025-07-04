This project is a decentralized supply chain management system built using Solidity, Hardhat, and React.js. It enables transparent, traceable, and tamper-proof tracking of shipments across different parties using blockchain technology.

🔍 Features
Create Shipments: Anyone can create a shipment by specifying receiver, pickup time, distance, and payment amount.

Track Status: Monitor the shipment’s progress (Pending → In Transit → Delivered).

Smart Contract Automation: Uses Solidity contracts to handle shipment logic, payments, and status updates.

Payment on Delivery: Ether payments are locked in the contract and released only when delivery is confirmed.

User Wallet Integration: Supports MetaMask for Web3 connectivity.

💡 Tech Stack
Frontend: React.js, Web3Modal, Ethers.js

Smart Contracts: Solidity, Hardhat

Blockchain: Local Hardhat Network (for testing), compatible with Ethereum testnets

State Management: React Context API

📦 Workflow
Sender creates a shipment by filling in details and paying in ETH.

Smart Contract records and holds the payment.

Shipment Status updates by invoking startShipment() and completeShipment().

Receiver confirms delivery — payment is released.

🛠️ Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy
Edit
npm install
Compile and deploy contracts:

bash
Copy
Edit
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
Start frontend:

bash
Copy
Edit
npm run dev
🧠 Use Cases
Tracking goods across manufacturers, warehouses, retailers

Verifying authenticity of products

Securing payments in logistics using smart contracts
