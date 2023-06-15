import styles from "../styles/Home.module.css";
import LicenseComponent from "../components/LicenseComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <LicenseComponent></LicenseComponent>
      </main>
    </div>
  );
}
