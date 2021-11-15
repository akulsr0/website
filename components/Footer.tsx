import { NextPage } from "next";
import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <div>
        <small>
          &copy;{" "}
          <a
            href="https://github.com/sanesource/next-personal-blog-template"
            target="_blank"
            rel="noreferrer"
          >
            SaneSource
          </a>
          , {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
};

export default Footer;
