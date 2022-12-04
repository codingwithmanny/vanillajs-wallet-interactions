// Imports
// ========================================================
import { ethers } from "hardhat";

// Deployment Script
// ========================================================
async function main() {
  const Contract = await ethers.getContractFactory("Greeter");
  const contract = await Contract.deploy("Hello From Deployed!");

  await contract.deployed();

  console.log(`Contact deployed to ${contract.address}`);
};

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
