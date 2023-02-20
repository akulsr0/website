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
              opacity: props.currentPath === link.href ? 1 : 0.6,
              color:
                props.currentPath === link.href && isDarkTheme
                  ? "#ced6e0"
                  : isDarkTheme
                  ? "lightgrey"
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
        backgroundColor: isDarkTheme ? "#192534" : "#eeeeee",
        borderBottom: `0.25rem solid ${isDarkTheme ? "#40739e" : "#a5a5a5"}`,
      }}
    >
      <div>
        <div>
          <Link href="/" passHref>
            <h1
              className={styles.title}
              style={{
                color: isDarkTheme ? "#ced6e0" : "black",
              }}
            >
              {name}
            </h1>
          </Link>
          <DarkModeSwitch
            checked={isDarkTheme}
            onChange={toggleTheme}
            color={isDarkTheme ? "#ced6e0" : "black"}
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
