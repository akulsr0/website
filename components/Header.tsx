import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import defaults from "../constants/default.json";

import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Header.module.css";

const { name, menu } = defaults;

interface IMenuItem {
  title: string;
  href: string;
}

interface IHeaderProps extends WithRouterProps {}

const Links = (props: { currentPath: string }) => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      {(menu as Array<IMenuItem>).map((link) => (
        <h2 key={link.title}>
          <Link
            href={link.href}
            passHref
            className={styles.link}
            style={{
              fontWeight: props.currentPath === link.href ? 600 : 300,
              color:
                props.currentPath === link.href && isDarkTheme
                  ? "#ece3cc"
                  : isDarkTheme
                  ? "#bababa"
                  : "#111",
            }}
          >
            {link.title}
          </Link>
        </h2>
      ))}
    </>
  );
};

const Header = (props: IHeaderProps) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const currentPath = props.router.pathname;

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: isDarkTheme ? "#2a2a2a" : "#eeeeee",
        borderBottom: `0.25rem solid ${isDarkTheme ? "#9b9786" : "#a5a5a5"}`,
      }}
    >
      <div>
        <div>
          <Link href="/" passHref>
            <h1
              className={styles.title}
              style={{
                color: isDarkTheme ? "#ece3cc" : "black",
              }}
            >
              {name}
            </h1>
          </Link>
          <DarkModeSwitch
            checked={isDarkTheme}
            onChange={toggleTheme}
            color={isDarkTheme ? "#ece3cc" : "black"}
          />
        </div>
        <nav className={styles.links}>
          <Links currentPath={currentPath} />
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
