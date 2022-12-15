import * as React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/List.module.css";

export type Link = { title: string; href: string; openInNewTab?: boolean };

export interface ILinkList {
  list: Array<Link>;
  title: string;
}

interface IListProps extends ILinkList {}

const List = (props: IListProps) => {
  const { isDarkTheme } = useTheme();
  const { list, title } = props;

  return (
    <div className={styles.listWrapper}>
      <strong style={{ color: isDarkTheme ? "#ece3cc" : "#3d3d3d" }}>
        {title}
      </strong>
      <ul className="list">
        {list.map((l) => (
          <li key={l.title}>
            <Link href={l.href} target={l?.openInNewTab ? "_blank" : "_self"}>
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
