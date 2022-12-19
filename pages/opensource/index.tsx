import * as React from "react";
import Link from "next/link";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Head from "../../components/_head";
import { OPENSOURCE_CONTRIBUTIONS } from "../../constants/oss";
import List from "../../components/List";

const Opensource: React.FC<null> = (): JSX.Element => {
  const linksList = OPENSOURCE_CONTRIBUTIONS.map((c) => ({
    title: c,
    href: `/opensource/${c}`,
  }));

  return (
    <Container>
      <Head title="Opensource" />
      <Header />
      <main className="main-content">
        <h2>Opensource Work</h2>
        <List list={linksList} title="Opensource" showTitle={false} />
      </main>
      <Footer />
    </Container>
  );
};

export default Opensource;
