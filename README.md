# VanillaJS Wallet Interactions

A simple demonstration on how to use basic JavaScript to interact with a MetaMask wallet and a contract.

![VanillaJS Wallet Interaction Screenshot](/README/screenshot.png)

## Requirements

- nvm or node `v18.12.1`
- pnpm `v7.15.0`

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







