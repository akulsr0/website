import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import defaults from "../constants/default.json";

import styles from "../styles/Header.module.css";
const { name, menu } = defaults;

interface IMenuItem {
  title: string;
  href: string;
}

interface IHeaderProps extends WithRouterProps {}

const Links = (props: { currentPath: string }) => {
  return (
    <>
      {(menu as Array<IMenuItem>).map((link) => (
        <h2 key={link.title}>
          <Link
            href={link.href}
            passHref
            className={styles.link}
            style={{ fontWeight: props.currentPath === link.href ? 500 : 300 }}
          >
            {link.title}
          </Link>
        </h2>
      ))}
    </>
  );
};

const Header = (props: IHeaderProps) => {
  const currentPath = props.router.pathname;

  return (
    <header className={styles.header}>
      <div>
        <Link href="/" passHref>
          <h1 className={styles.title}>{name}</h1>
        </Link>
        <nav className={styles.links}>
          <Links currentPath={currentPath} />
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
