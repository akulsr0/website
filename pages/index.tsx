import type { NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface HomeProps {
  homeContent: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

const Home: NextPage<HomeProps> = (props) => {
  const { homeContent } = props;

  return (
    <Container>
      <Head />
      <Header />
      <main className="main-content">
        <MDXRemote {...homeContent} components={{ Link }} />
      </main>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const homeContentPath = path.join("content");
  const homeContent = fs.readFileSync(homeContentPath + "/Home.mdx", "utf-8");
  const { content } = matter(homeContent);
  const outputContent = await serialize(content);
  return { props: { homeContent: outputContent } };
}

export default Home;
