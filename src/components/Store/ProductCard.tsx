import * as React from "react";
import Image from "next/image";
import styles from "../../styles/Store.module.css";

export interface Product {
  title: string;
  techStack: string;
  thumbnail: string;
  url: string;
}

export function ProductCard(props: Product) {
  const { title, techStack, url, thumbnail } = props;
  return (
    <div className={styles.productCard}>
      <Image width={140} height={140} src={thumbnail} alt={title} />
      <a href={url} target="_blank" rel="noreferrer">
        <h4>{title}</h4>
      </a>
      <p>{techStack}</p>
    </div>
  );
}
