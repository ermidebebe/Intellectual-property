import { ethers } from "ethers";
import { PatentRegistryMarketPlace__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();
async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_API_KEY
    });

    const deployer = wallet.connect(provider);
    // Contract deployment
    const contractFactory = new PatentRegistryMarketPlace__factory(deployer);
    const contract = await contractFactory.deploy("0x5af1E71Ca23872208fA74D6ec9f56c3B79295ea0")
    const deployTxReceipt = await contract.deployTransaction.wait();
    console.log(
        `The contract was deployed at address ${contract.address} at the block ${deployTxReceipt.blockNumber} and transaction hash ${deployTxReceipt.transactionHash}`
    );

}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
});
