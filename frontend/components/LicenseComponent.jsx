import styles from "../styles/InstructionsComponent.module.css";
import { getContract } from "../assets/utils"
import Router, { useRouter } from "next/router";
import { useRef } from 'react';
import { useSigner } from "wagmi";
import { useState } from 'react';
import { ethers } from "ethers";

export default function LicenseComponent() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Create A license</span>
                </h1>
            </header>
            <Create></Create>
            <div className={styles.footer}>
            </div>
        </div>
    );
}

function Create() {
    const { data: signer } = useSigner()
    const [txdata, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const patent_id = useRef(0)
    const price = useRef(0)
    const royalty = useRef(0)
    const expiration_date = useRef(0)
    if (txdata) 
    try
    {
    return (
        <div className={styles.buttons_container}>
            {Aprove(signer, setData, setLoading, Number(txdata.events['0']['args']['agreementId']))}
            <span>Successfully Created a License<a
                href={`https://sepolia.etherscan.io/tx/${txdata.transactionHash}`}
                target={"_blank"}
                style={{ color: "blue" }}>Link</a></span>
        </div>);
    }
    catch
    {
        console.log("catched")
    }
    if (isLoading) return (<div className={styles.buttons_container}><p>Creating</p></div>);
    return (<div className={styles.buttons_container}>
        {Button(signer, setData, setLoading, patent_id, price, royalty, expiration_date)}
    </div>);

}

async function Request(signer, setLoading, setData, patent_id, price, royalty, expiration_date) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).createLicenseAgreement(patent_id, price, royalty, expiration_date)
            const receipt = await tx.wait();
            console.log(receipt.transactionHash)
            setData(receipt)

        }
        catch
        {
            console.log("rejected")
        }

        setLoading(false);
    }

}

function Button(signer, setData, setLoading, patent_id, price, royalty, expiration_date) {
    return (<>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Patent Id" ref={patent_id}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Price" ref={price}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Royalty Percentage" ref={royalty}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Expiration Date" ref={expiration_date}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(signer, setLoading, setData, patent_id.current.value, price.current.value, royalty.current.value, expiration_date.current.value)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Create</p>
        </button>
    </>);
}
async function AproveLicense(signer, setLoading, setData, license_id) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).approveLicenseAgreement(license_id)
            const receipt = await tx.wait();
            console.log(receipt.transactionHash)
            setData(receipt.transactionHash)

        }
        catch
        {
            console.log("rejected")
        }

        setLoading(false);
    }

}
async function RejectLicense(signer, setLoading, setData, license_id) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).rejectLicenseAgreement(license_id)
            const receipt = await tx.wait();
            console.log(receipt.transactionHash)
            setData(receipt.transactionHash)

        }
        catch
        {
            console.log("rejected")
        }

        setLoading(false);
    }

}
function Aprove(signer, setData, setLoading, license_id) {
    return (<>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => AproveLicense(signer, setLoading, setData, license_id)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Aprove</p>
        </button>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => RejectLicense(signer, setLoading, setData, license_id)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Reject</p>
        </button>
    </>);
}