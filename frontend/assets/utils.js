import { ethers } from "ethers";
import * as RegistryJson from '../assets/PatentRegistryMarketPlace.json'
import * as TokenJson from '../assets/PatentNFT.json'

export function getToken() {
    const contractAddress = "0x5af1E71Ca23872208fA74D6ec9f56c3B79295ea0"
    const contract = new ethers.Contract(contractAddress, TokenJson.abi);
    return contract
}

export function getContract() {
    const contractAddress = "0xab0adE28AeEB1759f6Bf3d783196dB5a3A59fcFa"
    const contract = new ethers.Contract(contractAddress, RegistryJson.abi);
    return contract
}