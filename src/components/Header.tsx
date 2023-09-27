import Link from "next/link";
import Image from "next/image";
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
  const { isDarkTheme, toggleTheme } = useTheme();

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
      <DarkModeSwitch
        size={24}
        checked={isDarkTheme}
        onChange={toggleTheme}
        color={isDarkTheme ? "#ced6e0" : "black"}
      />
    </>
  );
};

const Header = (props: IHeaderProps) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const currentPath = props.router.pathname;

  return (
    <header className={styles.header}>
      <section>
        <div>
          <Image
            width="60"
            height="60"
            src="/images/akul/anim-800.JPG"
            alt="akul"
          />
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
        </div>
        <nav
          className={styles.links}
          style={{
            borderBottom: `1px solid ${
              isDarkTheme ? "#fefefe33" : "lightgrey"
            }`,
          }}
        >
          <Links currentPath={currentPath} />
        </nav>
      </section>
    </header>
  );
};

export default withRouter(Header);
