import { NextPage } from "next";
import defaults from "../constants/default.json";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const { uses } = defaults;

const Uses: NextPage = () => {
  const Uses = (
    use: Record<string, string | { text: string; link: string }>
  ) => {
    return Object.entries(use).map(([key, val]) => {
      return (
        <div key={key}>
          <strong>{key}: &nbsp;</strong>
          {typeof val === "object" ? (
            <a href={val.link} target="_blank" rel="noreferrer">
              {val.text}
            </a>
          ) : (
            <span style={{ fontWeight: "lighter" }}>{val}</span>
          )}
        </div>
      );
    });
  };

  return (
    <Container>
      <Head title="Uses" metaDescription="What do I use?" />
      <Header />
      <h2 style={{ margin: "1rem 0" }}>Uses</h2>
      <div>
        {Object.entries(uses).map(([category, subuses]) => (
          <div key={category} style={{ marginBottom: 10 }}>
            <h3>
              <u>{category}</u>
            </h3>
            <span>{Uses(subuses)}</span>
          </div>
        ))}
      </div>
      <Footer />
    </Container>
  );
};

export default Uses;
