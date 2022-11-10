import { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface WorkProps {
  workContent: string;
}

const Work: NextPage<WorkProps> = (props) => {
  const { workContent } = props;

  return (
    <Container>
      <Head title="Work" />
      <Header />
      <article className="main-content">
        <h2 style={{ marginBottom: "1rem" }}>Work</h2>
        <div dangerouslySetInnerHTML={{ __html: workContent }} />
      </article>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const workContentPath = path.join("content");
  const workContent = fs.readFileSync(workContentPath + "/Work.md", "utf-8");
  const { content } = matter(workContent);
  return { props: { workContent: marked(content) } };
}

export default Work;
