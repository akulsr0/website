import { NextPage } from "next";
import List from "../components/List";
import defaults from "../constants/default.json";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Footer.module.css";

const { footer_links: footerLinks } = defaults;

const Footer: NextPage = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer className={styles.footer}>
      <section
        style={{
          borderTop: `1px solid ${isDarkTheme ? "#fefefe33" : "lightgrey"}`,
        }}
      >
        {Object.values(footerLinks).map((fl) => (
          <List key={fl.title} list={fl.list} title={fl.title} />
        ))}
      </section>
    </footer>
  );
};

export default Footer;
