import styles from "../styles/InstructionsComponent.module.css";
import { getContract } from "../assets/utils";
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
    const title = useRef(0)
    const description = useRef(0)
    const documents = useRef(0)
    const tokenUri = useRef(0)

    if (txdata) return (
        <div className={styles.buttons_container}>
            <License></License>
            <span>Successfully Registered <a
                href={`https://sepolia.etherscan.io/tx/${txdata}`}
                target={"_blank"}
                style={{ color: "blue" }}>Link</a></span>
        </div>);
    if (isLoading) return (<><p>Registering</p></>);
    return (<div className={styles.buttons_container}>
        {Button(signer, setData, setLoading, title, description, documents, tokenUri)}
    </div>);

}

async function Request(signer, setLoading, setData, title, description, documents, tokenUri) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).registerPatent(title, description, documents.split(","), tokenUri);
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

function Button(signer, setData, setLoading, title, description, documents, tokenUri) {
    return (<>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Title" ref={title}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Description" ref={description}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Documents" ref={documents}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Token URI" ref={tokenUri}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(signer, setLoading, setData, title.current.value,
                description.current.value, documents.current.value, tokenUri.current.value)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Register</p>
        </button>
    </>);
    
}
function License() {
    return (<>
        <a className={[styles.button, styles.text].join(" ")} href='http://localhost:3000/license' >Create A License</a>
    </>);
}
