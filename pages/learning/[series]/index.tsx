import * as React from "react";
import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";

import fs from "fs";
import path from "path";

import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getNameFromSlug, toTitleCase } from "../../../helpers";

import styles from "../../../styles/Learning.module.css";

interface ILearningSeries {
  series: string;
  indexContent: string;
}

const LearningSeries: NextPage<ILearningSeries> = (props) => {
  const { series, indexContent } = props;
  const title = toTitleCase(getNameFromSlug(series));
  const seriesIndexRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    seriesIndexRef.current!.innerHTML = indexContent;
  }, [indexContent]);

  return (
    <Container>
      <Head
        title={title}
        metaDescription={`${title} | Sharing learning of ${title} here.`}
      />
      <Header />
      <main className="main-content">
        <Link href="/learning" passHref>
          <h2 className={styles.pointer}>&#8592;&nbsp;&nbsp;Learning</h2>
        </Link>
        <h3 className={styles.mt1}>{title}</h3>
        <div ref={seriesIndexRef}></div>
      </main>
      <Footer />
    </Container>
  );
};

export async function getStaticPaths() {
  const learningPath = path.join("content/learning");
  const learningContent = fs.readdirSync(learningPath);
  const paths = learningContent.map((lc) => ({
    params: { series: lc },
  }));

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const series = ctx.params?.series;
  const indexContent = fs.readFileSync(
    `content/learning/${series}/index.md`,
    "utf-8"
  );

  return {
    props: { series, indexContent },
  };
}

export default LearningSeries;
