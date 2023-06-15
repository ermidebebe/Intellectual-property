import styles from "../styles/Home.module.css";
import VerifyComponent from "../components/VerifyComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <VerifyComponent></VerifyComponent>
      </main>
    </div>
  );
}
