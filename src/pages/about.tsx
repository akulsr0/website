import { NextPage } from "next";
import Image from "next/image";
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

import styles from '../styles/About.module.css'

interface AboutProps {
  aboutContent: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
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
      <article className="main-content">
        <Image className={styles.aboutImage} width={280} height={360} src='/images/akul/other-img-600.jpg' alt="That's me" onClick={() => window.open('/images/akul/other-img-600.jpg', '_blank')} />
        <MDXRemote {...aboutContent} components={{ Link, Image }} />
      </article>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const aboutContentPath = path.join("content");
  const aboutContent = fs.readFileSync(
    aboutContentPath + "/About.mdx",
    "utf-8"
  );
  const { content } = matter(aboutContent);
  const outputContent = await serialize(content);
  return { props: { aboutContent: outputContent } };
}

export default About;
