import * as React from "react";
import Image from "next/image";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Head from "../../components/_head";

import { store } from "../../constants/default.json";
import styles from "../../styles/Store.module.css";
import { ProductCard } from "../../components/Store";

const Store = () => {
  return (
    <Container>
      <Head
        title="Store"
        metaDescription="You can find the links to buy the source code of react native apps, user interfaces, demo applications made using different tech stacks here."
      />
      <Header />
      <br />
      <h2>Store</h2>
      <div className={styles.productsList}>
        {store.products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
      <Footer />
    </Container>
  );
};

export default Store;
