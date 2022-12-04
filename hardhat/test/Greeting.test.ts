// Deployment Script
// ========================================================
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// Tests
// ========================================================
describe("Greeter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("Greeter");
    const contract = await Contract.deploy("Hello Contract Deployed From Tests");

    return { contract, owner, otherAccount };
  }

  /**
   * 
   */
  describe("Deployment", function () {
    /**
     * 
     */
    it("Should deploy with original message", async function () {
      // Setup
      const { contract } = await loadFixture(deployOneYearLockFixture);

      // Init + Expectations
      expect(await contract.getGreeting()).to.equal("Hello Contract Deployed From Tests");
    });

    /**
     * 
     */
    it("Should set a new message", async function () {
      // Setup
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);

      // Init
      await contract.connect(owner).setGreeting("Hello There")

      // Expectations
      expect(await contract.getGreeting()).to.equal("Hello There");
    });
  });
});
