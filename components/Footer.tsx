import { NextPage } from "next";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer className={styles.footer}>
      <style jsx>{`
        small,
        a {
          text-decoration: none;
          color: ${isDarkTheme ? "#9b9786" : "#222"};
        }
      `}</style>
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
