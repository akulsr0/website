import { NextPage } from "next";
import { social_links } from "../constants/default.json";
import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  const links = Object.entries(social_links).map(([s, l]) => (
    <span key={s}>
      <a href={l} target="_blank" rel="noreferrer">
        {s}
      </a>
    </span>
  ));

  return (
    <footer className={styles.footer}>
      <hr />
      <div>{links}</div>
    </footer>
  );
};

export default Footer;
