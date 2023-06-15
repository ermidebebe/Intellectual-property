import styles from "../styles/Home.module.css";
import RegisterComponent from "../components/RegisterComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <RegisterComponent></RegisterComponent>
      </main>
    </div>
  );
}
