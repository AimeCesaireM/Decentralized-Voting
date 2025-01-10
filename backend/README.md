# Mammoth Rumble - Backend

## Introduction

The backend of the Decentralized Voting project is built to handle the creation, management, and execution of elections using smart contracts deployed on the Ethereum blockchain. This backend ensures transparency, immutability, and accountability in the voting process, addressing the issues of election manipulation and lack of trust in traditional systems.

This component leverages Solidity, Hardhat, and other tools to deploy and interact with the smart contracts securely and efficiently.

## Technologies Used

### Smart Contract Development:
- **Solidity**: For writing Ethereum smart contracts.
- **Hardhat**: A development environment to compile, test, and deploy the contracts.

### Testing:
- **Mocha**: A testing framework for running JavaScript-based tests.
- **Chai**: An assertion library used with Mocha for BDD/TDD testing.

### Additional Tools:
- **Ethers.js**: A library for interacting with Ethereum smart contracts.
- **Node.js**: For scripting and automation.
- **Pinata (IPFS)**: For storing election metadata on a decentralized storage network.

### Ethereum Standards:
- **EIP-1193**: For standardizing communication between the frontend and blockchain providers like MetaMask.

## Smart Contract Features

The smart contract is designed with the following functionalities:
1. **Vote Creation**: Administrators can create elections with descriptions, options, and end times.
2. **Secure Voting**: Participants can cast their votes, which are stored immutably on the blockchain.
3. **Vote Retrieval**: Election results can be queried in real-time to ensure transparency.
4. **Metadata Storage**: Election details, such as options and descriptions, are stored on IPFS for decentralized access.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **NPM** or **Yarn**
- **Hardhat** (installed globally or locally)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/AimeCesaireM/Decentralized-Voting.git
    ```

2. Navigate to the backend folder:
    ```bash
    cd Decentralized-Voting/backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Compile the smart contracts:
    ```bash
    npx hardhat compile
    ```

5. Run tests to ensure the contracts are functioning correctly:
    ```bash
    npx hardhat test
    ```

6. Deploy the contracts to a local or test network:
    ```bash
    npx hardhat run scripts/deploy.js --network <network-name>
    ```

### Deployment Notes
- Replace `<network-name>` with your desired network (e.g., `localhost`, `rinkeby`, `goerli`).
- Ensure you have a `.env` file set up with the necessary variables, such as:
    ```env
    PRIVATE_KEY=<your-private-key>
    INFURA_API_KEY=<your-infura-api-key>
    ```
- You can also use Alchemy or other Ethereum providers for RPC endpoints.

## Testing

Unit tests are written to verify the following:
- Correct creation and retrieval of votes.
- Proper functionality of voting mechanisms.
- Handling of edge cases like invalid vote IDs or duplicate votes.

Run all tests using:
```bash
npx hardhat test
```

### Test Example
Here's an example of a unit test for creating a vote:
```javascript
describe("Vote Creation", function () {
  it("should allow an admin to create a vote", async function () {
    const tx = await votingContract.createVote("Election 2025", ["Option 1", "Option 2"], endTime);
    await tx.wait();

    const vote = await votingContract.getVote(0);
    expect(vote.description).to.equal("Election 2025");
  });
});
```

## Folder Structure

```plaintext
backend/
├── contracts/           # Solidity smart contracts
│   └── Voting.sol       # Main voting contract
├── scripts/             # Deployment scripts
│   └── deploy.js        # Script for deploying contracts
├── test/                # Unit tests for contracts
│   └── Voting.test.js   # Tests for Voting.sol
├── hardhat.config.js    # Hardhat configuration file
├── package.json         # Project dependencies
└── README.md            # This README file
```

## Future Enhancements

- **Role-Based Access Control**: Add support for more granular permissions.
- **Enhanced Testing**: Increase coverage for edge cases and stress testing.
- **Gas Optimization**: Optimize smart contracts to reduce gas fees.

## License

This project is licensed under the MIT License.