import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import marked from "marked";
import matter from "gray-matter";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface HomeProps {
  homeContent: string;
}

const Home: NextPage<HomeProps> = (props) => {
  const { homeContent } = props;

  return (
    <Container>
      <Head title="Home" />
      <Header />
      <br />
      <div id="content" dangerouslySetInnerHTML={{ __html: homeContent }} />
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const homeContentPath = path.join("content");
  const homeContent = fs.readFileSync(homeContentPath + "/Home.md", "utf-8");
  const { content } = matter(homeContent);
  return { props: { homeContent: marked(content) } };
}

export default Home;
