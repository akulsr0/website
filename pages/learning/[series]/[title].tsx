import * as React from "react";
import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import matter from "gray-matter";
import marked from "marked";

import fs from "fs";

import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ILearning } from "../../../interfaces/Learning";
import { getNameFromSlug } from "../../../helpers";

import styles from "../../../styles/Learning.module.css";

interface ILearningContentPageProps {
  series: string;
  title: string;
  content: string;
  data: Record<string, string | number>;
}

const LearningContentPage: NextPage<ILearningContentPageProps> = (props) => {
  const { series, content } = props;
  const seriesTitle = getNameFromSlug(series);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (content && contentRef.current) {
      contentRef.current.innerHTML = marked(content);
    }
  }, [content]);

  return (
    <Container>
      <Head />
      <Header />
      <br />
      <Link href={`/learning/${series}`} passHref>
        <h2 className={styles.pointer}>&#8592;&nbsp;&nbsp;{seriesTitle}</h2>
      </Link>
      <div
        className={`${styles.mt1} ${styles.flexColumn}`}
        ref={contentRef}
      ></div>
      <Footer />
    </Container>
  );
};

export async function getStaticPaths() {
  let paths;

  const lcArray: Array<ILearning> = JSON.parse(
    fs.readFileSync("content/learning.json", "utf-8")
  );
  for (const lc of lcArray) {
    const lcChilds = lc.children.map((child) => {
      const title = child.match(/[a-zA-Z-]+/)?.[0];
      if (child === "index.md") return null;
      return { params: { series: lc.slug, title } };
    });
    paths = lcChilds.filter(Boolean);
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const series = ctx.params!.series as string;
  const title = ctx.params!.title as string;
  const seriesContent = fs.readdirSync(`content/learning/${series}`);
  const fileTitle = seriesContent.find((f) => f.match(`${title}.md`));
  const rawContent = fs.readFileSync(
    `content/learning/${series}/${fileTitle}`,
    "utf-8"
  );
  const { content, data } = matter(rawContent);

  return {
    props: {
      series,
      title,
      content,
      data,
    },
  };
}

export default LearningContentPage;
