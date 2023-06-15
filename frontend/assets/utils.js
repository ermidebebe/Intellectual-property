import { ethers } from "ethers";
import * as RegistryJson from '../assets/PatentRegistryMarketPlace.json'
import * as TokenJson from '../assets/PatentNFT.json'

export function getToken() {
    const contractAddress = "0x7823AFb9886f8B3B2Ea16C42deD85074b4dB6Ea3"
    const contract = new ethers.Contract(contractAddress, TokenJson.abi);
    return contract
}

export function getContract() {
    const contractAddress = "0x667155c2DE3bF0dA33CaB2a05433529E11EAD199"
    const contract = new ethers.Contract(contractAddress, RegistryJson.abi);
    return contract
}