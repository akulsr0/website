import { NextPage } from "next";
import styles from "../styles/Container.module.css";

const Container: NextPage = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
