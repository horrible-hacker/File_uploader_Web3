//const { network } = require("hardhat");

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
const Alchemy_key = process.env.Alchemy_key;
const sepolia_key = process.env.sepolia_key;
module.exports = {
  solidity: "0.8.28",
  networks:{
    hardhat: {
      
    },
    sepolia: {
      url: Alchemy_key,
      accounts: [sepolia_key],
    },
    
  },
  paths: {
    artifacts: "./client/src/artifacts",
  }
};