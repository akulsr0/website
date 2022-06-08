import * as React from "react";
import { NextPage } from "next";

import fs from "fs";
import path from "path";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ILearning } from "../../interfaces/Learning";

interface ILearningProps {
  content: Array<ILearning>;
}

const Learning: NextPage<ILearningProps> = (props) => {
  const { content } = props;

  return (
    <Container>
      <Head
        title="About"
        metaDescription="About me | I am Akul, self trained software developer. I have done bachelors in Computer Science Engineering from Babu Banarasi Das: National Institute of Technology and Management, Lucknow."
      />
      <Header />
      <br />
      <h2>Learning</h2>
      <ul>
        {content.map((c) => (
          <li key={c.slug}>
            <a href={`/learning/${c.slug}`}>{c.title}</a>
          </li>
        ))}
      </ul>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const learningContentPath = path.join("content/learning.json");
  const content = JSON.parse(fs.readFileSync(learningContentPath, "utf-8"));

  return {
    props: {
      content,
    },
  };
}

export default Learning;
