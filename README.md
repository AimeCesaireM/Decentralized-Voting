
# Mammoth Rumble: A Decentralized Voting Solution

## See The Live Project, hosted on Google Cloud with Apache [here](http://34.44.182.12/):

## Introduction

Decentralized Voting is a Web3 solution that aims to solve the issues of election opacity and manipulation, especially in smaller institutions where traditional election processes are vulnerable to changes in results. Many small organizations, such as university clubs or student governments, rely on tools like Google Forms to run elections, which can be easily tampered with by those in control. This project uses blockchain technology to ensure transparency, immutability, and accountability in the election process. 

With the increasing distrust in traditional election methods, Decentralized Voting offers a solution that provides verifiable and tamper-proof election results using smart contracts on the Ethereum blockchain.

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Bootstrap**: A framework for developing responsive and mobile-first websites.
- **Ethers.js**: A library for interacting with the Ethereum blockchain from the frontend.
- **IPFS**: Used for storing and retrieving election data (via Pinata Cloud).
- **JSON**: Used on the backend to store the interface of the compiled and deployed Solidity smart contract
  
### Backend (Smart Contract):
- **Nodejs**: The Javascript development environment
- **Solidity**: The programming language used to write smart contracts on the Ethereum blockchain.
- **Hardhat**: A development environment to compile, test, and deploy Ethereum smart contracts.
- **JSON**: Created on frontend to store the details of a poll. It is then to be uploaded to an IPFS server.
- **Apache and Google Cloud**: I used Apache and Google cloud for deployment and hosting the completed project
  
### Testing:
- **Chai**: A BDD / TDD assertion library for Node.js and browsers.
- **Mocha**: A testing framework for running JavaScript tests.
  
### Languages:
- **JavaScript**: For the frontend, deployment, and testing scripts.
- **Solidity**: The contract is written in the language of Ethereum smart contracts.

### Ethereum Standards:
- **EIP-1193**: This standard provides a common interface for Ethereum providers (such as MetaMask) to enable web applications to interact with the Ethereum network.

## Problem Statement

In many small institutions, election systems are vulnerable to manipulation, especially when they rely on centralized platforms like Google Forms, where outcomes can be altered by those in control. The increasing doubts surrounding election integrity further exacerbate the problem. With decentralized voting, the process becomes transparent, traceable, and immune to tampering, as the results are stored on the Ethereum blockchain.

This project uses blockchain technology to ensure the integrity of the election process, making it a trustless, verifiable system that anyone can audit.

## APIs & Services Integrated

- **MetaMask**: A browser extension that allows users to interact with the Ethereum blockchain directly. It acts as the wallet to manage funds and sign transactions for voting.
- **Pinata Cloud**: Used for storing election data (in JSON format) on the IPFS network. This ensures that the election data is immutable and accessible via its unique URI.
- **EIP-1193**: Interfaced through `ethers.js` to enable communication between the frontend and MetaMask, handling user accounts and transaction signing.

## Unit Testing

Unit tests were written using **Chai** and **Mocha** to ensure the correct functionality of the smart contracts. The contract was tested for several scenarios, such as:
- Ensuring that votes can be created and fetched correctly.
- Verifying that the contract properly handles different options and voting actions.
- Checking that only eligible members can participate in voting.

All tests were run locally in the development environment using **Hardhat**.

## Installation & Setup

### Backend (Smart Contract)

1. Clone the repository:
    ```bash
    git clone https://github.com/AimeCesaireM/Decentralized-Voting.git
    ```

2. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Compile the smart contracts:
    ```bash
    npx hardhat compile
    ```

5. Run the tests:
    ```bash
    npx hardhat test
    ```

6. Deploy the smart contract to the Ethereum network (or local testnet):
    ```bash
    npx hardhat run scripts/deploy.js --network <network-name>
    ```
    If you are deploying to a localhost, then start the local hardhat test network before step 6.
   ```bash
   npx hardhat node
    ```

### Frontend

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the application in your browser at `http://localhost:3000`.

### Connecting MetaMask

To interact with the Ethereum network, ensure you have **MetaMask** installed and connected. The app will detect MetaMask and request access to your Ethereum account.

## Usage

1. Navigate to the home page, where you can join the platform by connecting your MetaMask wallet.
2. Once connected, you can either create a new vote or participate in existing votes.
3. As an admin, you can create votes with options, descriptions, and an end date.
4. As a member, you can vote on available elections.
5. Every button you click is a transaction, so you will have to confirm it in your **Metamask** wallet.

## Potential Challenges

1. For institutions that want to enforce that users do not use different wallets to vote multiple times--  they can make institutional email addresses a field in their poll. To maintain anonymity, the emails would be hashed before being stored on the blockchain.
2. To guard against unwelcome voters, the voting platform can be put behind an institution's SSO authentication.

## License
This project is licensed under the MIT license
Author: Aime Cesaire Mugishawayo. All Rights Reserved.

## Conclusion

Decentralized Voting provides a transparent, immutable, and tamper-proof election system that removes the need for trust in centralized platforms. It uses blockchain technology to guarantee that the election data remains public, verifiable, and secure. This project is ideal for small institutions that need a more reliable and fair election process.
