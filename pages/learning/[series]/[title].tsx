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
import { ILearning, ILearningRecommended } from "../../../interfaces/Learning";
import { getNameFromSlug } from "../../../helpers";

import styles from "../../../styles/Learning.module.css";
import { getRecommendedLearningContent } from "../../../helpers/learning";

interface ILearningContentPageProps {
  series: string;
  title: string;
  content: string;
  data: Record<string, string | number>;
  recommended: ILearningRecommended;
}

const LearningContentPage: NextPage<ILearningContentPageProps> = (props) => {
  const { series, content, recommended } = props;
  const seriesTitle = getNameFromSlug(series);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (content && contentRef.current) {
      contentRef.current.innerHTML = marked(content);
    }
  }, [content]);

  function getRecommendedTipLink(lc: string, title: string) {
    return (
      <div>
        <strong>{title}</strong>
        <Link href={`/learning/${series}/${lc}`}>{lc}</Link>
      </div>
    );
  }

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
      <div className={styles.recommended}>
        {recommended.prev &&
          getRecommendedTipLink(recommended.prev, "Previous")}
        {recommended.next && getRecommendedTipLink(recommended.next, "Next")}
      </div>
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

  const learningContent = JSON.parse(
    fs.readFileSync("content/learning.json", "utf-8")
  );
  const seriesContent = learningContent.find(
    (c: ILearning) => c.slug === series
  );
  const fileTitle = seriesContent.children.find((f: string) =>
    f.match(`${title}.md`)
  );
  const rawContent = fs.readFileSync(
    `content/learning/${series}/${fileTitle}`,
    "utf-8"
  );
  const { content, data } = matter(rawContent);

  const recommended = getRecommendedLearningContent(
    seriesContent.children,
    fileTitle
  );

  return {
    props: {
      series,
      title,
      content,
      data,
      recommended,
    },
  };
}

export default LearningContentPage;
