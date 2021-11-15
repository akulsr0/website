import { NextPage } from "next";
import { social_links } from "../constants/default.json";
import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <div>
        <small>&copy; Akul Srivastava, {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};

export default Footer;
