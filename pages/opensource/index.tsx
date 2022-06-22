import * as React from "react";
import Link from "next/link";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Head from "../../components/_head";
import { OPENSOURCE_CONTRIBUTIONS } from "../../constants/oss";

const Opensource: React.FC<null> = (): JSX.Element => {
  return (
    <Container>
      <Head title="Opensource" />
      <Header />
      <br />
      <section>
        <h2>Opensource Work</h2>
        <ul>
          {OPENSOURCE_CONTRIBUTIONS.map((oss) => (
            <li key={oss}>
              <Link href={`/opensource/${oss}`}>{oss}</Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </Container>
  );
};

export default Opensource;
