import { NextPage } from "next";
import { useEffect, useRef } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const workContentMarkup = marked(workContent);
    contentRef.current && (contentRef.current.innerHTML = workContentMarkup);
  }, []);

  return (
    <Container>
      <Head title="Work" />
      <Header />
      <br />
      <div ref={contentRef}></div>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const workContentPath = path.join("content");
  const workContent = fs.readFileSync(workContentPath + "/Work.md", "utf-8");
  const { content } = matter(workContent);
  return { props: { workContent: content } };
}

export default Work;
