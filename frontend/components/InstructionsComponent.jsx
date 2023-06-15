import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.buttons_container}>
				<a
					href={"http://localhost:3000/register"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Register Patent</p>
					</div>
				</a>
				<a
					href={"http://localhost:3000/verify"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Verify Patent</p>
					</div>
				</a>
				{/* <Delegate></Delegate> */}
				<a
					href={"http://localhost:3000/disputes"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Disputes</p>
					</div>
				</a>
			</div>
			<div className={styles.footer}>
			</div>
		</div>
	);
}
