import { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface AboutProps {
  aboutContent: string;
}

const About: NextPage<AboutProps> = (props) => {
  const { aboutContent } = props;

  return (
    <Container>
      <Head
        title="About"
        metaDescription="About me | I am Akul, self trained software developer. I have done bachelors in Computer Science Engineering from Babu Banarasi Das: National Institute of Technology and Management, Lucknow."
      />
      <Header />
      <br />
      <div id="content" dangerouslySetInnerHTML={{ __html: aboutContent }} />
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const aboutContentPath = path.join("content");
  const aboutContent = fs.readFileSync(aboutContentPath + "/About.md", "utf-8");
  const { content } = matter(aboutContent);
  return { props: { aboutContent: marked(content) } };
}

export default About;
