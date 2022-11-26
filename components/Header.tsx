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
    <h2 key={link.title}>
      <Link href={link.href} passHref className={styles.link}>
        {link.title}
      </Link>
    </h2>
  ));

  return (
    <header className={styles.header}>
      <div>
        <Link href="/" passHref>
          <h1 className={styles.title}>{name}</h1>
        </Link>
        <nav className={styles.links}>{Links}</nav>
      </div>
    </header>
  );
};

export default Header;
