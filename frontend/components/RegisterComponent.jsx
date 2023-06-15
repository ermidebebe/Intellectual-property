import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useRef } from 'react';
import { useSigner } from "wagmi";
import { useState } from 'react';

export default function RegisterComponent() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Register Patent</span>
                </h1>
            </header>
            <Register></Register>
            <div className={styles.footer}>
            </div>
        </div>
    );
}

function Register() {
    const { data: signer } = useSigner()
    const [txdata, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const amount_ref = useRef(0)
    if (txdata) return (
        <div className={styles.buttons_container}>
            {Button(signer, setData, setLoading, amount_ref)}
            <span>Successfully Minted <a
                href={`https://sepolia.etherscan.io/tx/${txdata.Transaction_hash}`}
                target={"_blank"}
                style={{ color: "blue" }}>Link</a></span>
        </div>);
    if (isLoading) return (<><p>Registering</p></>);
    return (<div className={styles.buttons_container}>
        {Button(signer, setData, setLoading, amount_ref)}
    </div>);

}

async function Request(amount, signer, setLoading, setData) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).purchaseTokens({
                value: ethers.utils.parseEther(amount).div(TOKEN_RATIO),
            });
            const receipt = await tx.wait();
            setData(receipt.transactionHash)

        }
        catch
        {
            console.log("rejected")
        }

        setLoading(false);
    }

}

function Button(signer, setData, setLoading, amount_ref) {
    return (<>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Title" ref={amount_ref}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Description" ref={amount_ref}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Documents" ref={amount_ref}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Token URI" ref={amount_ref}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(amount_ref.current.value, signer, setLoading, setData)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Register</p>
        </button>
    </>);
}

