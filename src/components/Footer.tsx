import { NextPage } from "next";
import List from "../components/List";
import defaults from "../constants/default.json";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Footer.module.css";

const { footer_links: footerLinks } = defaults;

interface FooterProps {
  enableFooterMargin: boolean;
}

const Footer: NextPage<FooterProps> = (props) => {
  const { isDarkTheme } = useTheme();
  const { enableFooterMargin = true } = props;

  return (
    <footer
      className={styles.footer}
      style={
        !enableFooterMargin
          ? {
              marginTop: 0,
            }
          : {}
      }
    >
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
