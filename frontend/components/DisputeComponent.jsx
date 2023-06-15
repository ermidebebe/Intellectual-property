import styles from "../styles/InstructionsComponent.module.css";
import { getContract } from "../assets/utils"
import Router, { useRouter } from "next/router";
import { useRef } from 'react';
import { useSigner } from "wagmi";
import { useState } from 'react';
import { ethers } from "ethers";

export default function DisputeComponent() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Dispute</span>
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
    const respondant = useRef(0)
    const description = useRef(0)
    if (txdata)
        try {
            return (
                <div className={styles.buttons_container}>
                    {Aprove(signer, setData, setLoading, Number(txdata.events['0']['args']['disputeId']))}
                    {console.log(txdata)}
                    <span>Successfully Created a Dispute<a
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
        {Button(signer, setData, setLoading, patent_id, respondant, description)}
    </div>);

}

async function Request(signer, setLoading, setData, patent_id, respondant, description) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).initiateDispute(patent_id, respondant, description)
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

function Button(signer, setData, setLoading, patent_id, respondant, description) {
    return (<>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Patent Id" ref={patent_id}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Respondant Address" ref={respondant}></input>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Description" ref={description}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(signer, setLoading, setData, patent_id.current.value, respondant.current.value, description.current.value)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Create</p>
        </button>
    </>);
}

async function UpVoteDispute(signer, setLoading, setData, dispute_id) {
    setLoading(true)
    if (signer) {
        //try {
            let contract = getContract()
            const tx = await contract.connect(signer).upVoteDispute(dispute_id)
            const receipt = await tx.wait();
            console.log(receipt.transactionHash)
            setData(receipt.transactionHash)

        //}
        // catch
        // {
        //     console.log("rejected")
        // }

        setLoading(false);
    }

}
async function DownVoteDispute(signer, setLoading, setData, dispute_id) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).downVoteDispute(dispute_id)
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

async function ResolveDispute(signer, setLoading, setData, dispute_id) {
    setLoading(true)
    if (signer) {
        try {
            let contract = getContract()
            const tx = await contract.connect(signer).resolveDispute(dispute_id)
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

function Aprove(signer, setData, setLoading, dispute_id) {
    return (<>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => UpVoteDispute(signer, setLoading, setData, dispute_id)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>UpVote</p>
        </button>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => DownVoteDispute(signer, setLoading, setData, dispute_id)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>DownVote</p>
        </button>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => ResolveDispute(signer, setLoading, setData, dispute_id)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Resolve</p>
        </button>
    </>);
}