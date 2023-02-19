import { NextPage } from "next";
import List from "../components/List";
import defaults from "../constants/default.json";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Footer.module.css";

const { footer_links: footerLinks } = defaults;

const Footer: NextPage = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer
      className={styles.footer}
      style={{
        backgroundColor: isDarkTheme ? "#192534" : "#eeeeee",
        borderTop: `0.25rem solid ${isDarkTheme ? "#40739e" : "#a5a5a5"}`,
      }}
    >
      <section>
        {Object.values(footerLinks).map((fl) => (
          <List key={fl.title} list={fl.list} title={fl.title} />
        ))}
      </section>
    </footer>
  );
};

export default Footer;
