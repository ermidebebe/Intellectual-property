import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <p>
        <a href="http://localhost:3000" >IP Marketplace</a>
      </p>

      <ConnectButton></ConnectButton>
    </nav>
  );
}
