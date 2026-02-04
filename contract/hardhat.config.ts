import "dotenv/config";
import { defineConfig } from "hardhat/config";
import HardhatIgnitionEthersPlugin from "@nomicfoundation/hardhat-ignition-ethers";


export default defineConfig({
  plugins: [HardhatIgnitionEthersPlugin],
  solidity: {
    version: "0.8.28",
  },
  networks: {
    sepolia: {
        type: "http",
        url: process.env.SEPOLIA_RPC_URL!,   
        accounts: [process.env.PRIVATE_KEY!],  //in hardhat for deploy /scripts we use this private key to sign transaction
    },
  }
});