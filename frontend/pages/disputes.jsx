import styles from "../styles/Home.module.css";
import DisputeComponent from "../components/DisputeComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <DisputeComponent></DisputeComponent>
      </main>
    </div>
  );
}
