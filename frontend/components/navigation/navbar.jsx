import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <p>
        <a href="#" target={"_blank"}>IP Marketplace</a>
      </p>

      <ConnectButton></ConnectButton>
    </nav>
  );
}
