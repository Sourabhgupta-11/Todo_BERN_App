import "dotenv/config";
import { defineConfig } from "hardhat/config";
import HardhatIgnitionEthersPlugin from "@nomicfoundation/hardhat-ignition-ethers";


export default defineConfig({
  plugins: [HardhatIgnitionEthersPlugin],
  solidity: {
    version: "0.8.28",
  }
});