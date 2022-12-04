# VanillaJS Wallet Interactions

Ever wanted to know how to do direct RPC requests without the need of libraries?

This project is a simple demonstration on how to use basic JavaScript to interact with a MetaMask wallet and a contract.

![VanillaJS Wallet Interaction Screenshot](/README/screenshot.png)

## Requirements

- nvm or node `v18.12.1`
- pnpm `v7.15.0`

## Deployed Contracts

The same contract has been deployed on all these networks.s

```js
const CONTRACT_ON_CHAINS = {
    // Ethereum Mainnet
    1: '0x76460E73eadE1DDe315E07a5eCa092448c193a2F',
    // Goerli Testnet
    5: '0x3aC587078b344a3d27e56632dFf236F1Aff04D56',
    // Polygon Mainnet
    137: '0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73',
    // Localhost
    1337: '',
    // zkEVM Testnet
    1402: '0x76460E73eadE1DDe315E07a5eCa092448c193a2F',
    // Mumbai Testnet
    80001: '0x7Bd54062eFa363A97dC20f404825597455E93582',
    // Sepolia Testnet
    11155111: '0x375f01b156d9bdddd41fd38c5cc74c514cb71f73',
};
```

## The Contract

This is the default contract used for interactions and for deployments.

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Greeter {
    // Events that allows for emitting a message
    event NewGreeting(address sender, string message);

    // Variables
    string greeting;

    // Main constructor run at deployment
    constructor(string memory _greeting) {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }

    // Get function
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Set function
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }
}
```

## Getting Started

**Install dependencies:**

```bash
pnpm install;
```

**Start server:**

```bash
pnpm run dev;
```

## Local Hardhat Node

**Install dependencies:**

```bash
cd hardhat;
pnpm install;
```

**Terminal 1 Run Node:**

```bash
# FROM ./hardhat

pnpm run node;

# Import this wallet into MetaMask
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Terminal 2 Deploy Contract:**

While HardHat node is running:

```bash
# FROM ./hardhat

pnpm run deploy

# Use the deployed contract address for local node interactions
# Expected Output:
# Contact deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Local Hardhat Tests

While HardHat node is running:

```bash
# FROM ./hardhat

pnpm run test

# Expected Output:
#   Greeter
#     Deployment
#       ✔ Should deploy with original message (816ms)
#       ✔ Should set a new message
# 
#   2 passing (837ms)
```







