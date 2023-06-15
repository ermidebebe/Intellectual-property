import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      hardfork: "merge",
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: false,
        runs: 0,
      },
    },
  },
  paths: { tests: "tests" },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};

export default config;
