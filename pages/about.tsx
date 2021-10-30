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

interface AboutProps {
  aboutContent: string;
}

const About: NextPage<AboutProps> = (props) => {
  const { aboutContent } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aboutContentMarkup = marked(aboutContent);
    contentRef.current && (contentRef.current.innerHTML = aboutContentMarkup);
  }, []);

  return (
    <Container>
      <Head title="About" />
      <Header />
      <br />
      <div ref={contentRef}></div>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const aboutContentPath = path.join("content");
  const aboutContent = fs.readFileSync(aboutContentPath + "/About.md", "utf-8");
  const { content } = matter(aboutContent);
  return { props: { aboutContent: content } };
}

export default About;
