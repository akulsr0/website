import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import defaults from "../constants/default.json";

const { name, menu } = defaults;

interface IMenuItem {
  title: string;
  href: string;
}

const Header: NextPage = () => {
  const Links = (menu as Array<IMenuItem>).map((link) => (
    <Link key={link.title} href={link.href} passHref>
      <a href="#" className={styles.link}>
        {link.title}
      </a>
    </Link>
  ));

  return (
    <header className={styles.header}>
      <a className={styles.skipNavigation} href="#content">
        Skip Navigation
      </a>
      <Link href="/" passHref>
        <h1 className={styles.title}>{name}</h1>
      </Link>
      <div className={styles.links}>{Links}</div>
    </header>
  );
};

export default Header;
