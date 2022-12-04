import { NextPage } from "next";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Footer.module.css";

const footerLinks = [
  { link: "/github", text: "github" },
  { link: "/instagram", text: "instagram" },
  { link: "/linkedin", text: "linkedin" },
  { link: "/twitter", text: "twitter" },
  { link: "/stackoverflow", text: "stackoverflow" },
  { link: "https://akulsr0.gumroad.com/", text: "gumroad" },
  { link: "https://www.npmjs.com/~akulsr0", text: "npm" },
  {
    link: "https://play.google.com/store/apps/developer?id=Akul+Srivastava",
    text: "playstore",
  },
];

const Footer: NextPage = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer className={styles.footer}>
      <style jsx>{`
        small,
        a {
          text-decoration: none;
          color: ${isDarkTheme ? "#ece3cc" : "#222"};
        }
        ul {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: center;
          list-style: none;
          column-gap: 0.6rem;
        }
        ul a {
          text-decoration: underline;
        }
      `}</style>
      <hr
        style={{ border: `1px solid ${isDarkTheme ? "#a59f8f" : "#f8f8f8"}` }}
      />

      <ul>
        {footerLinks.map(({ link, text }) => (
          <li key={text}>
            <a href={link} target="_blank" rel="noreferrer">
              {text}
            </a>
          </li>
        ))}
      </ul>

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
