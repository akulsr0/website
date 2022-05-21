import * as React from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "../components/_head";
import styles from "../styles/Opensource.module.css";
import { OPENSOURCE_CONTRIBUTIONS } from "../constants/oss";

const Opensource: React.FC<null> = (): JSX.Element => {
  return (
    <Container>
      <Head title="Opensource" />
      <Header />
      <section className={styles.wrapper}>
        <h3>Opensource Work</h3>
        {OPENSOURCE_CONTRIBUTIONS.map((oss) => (
          <div key={oss.prUrl}>
            <a href={oss.prUrl} target="_blank" rel="noreferrer">
              {oss.title} <span>#{oss.prId}</span>
            </a>
            <h4>
              <a href={`https://github.com/${oss.org}`}>{oss.org}</a>/
              <a href={`https://github.com/${oss.org}/${oss.repo}`}>
                {oss.repo}
              </a>
            </h4>
            <p>merged on {oss.date}</p>
          </div>
        ))}
      </section>
      <Footer />
    </Container>
  );
};

export default Opensource;
