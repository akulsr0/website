import * as React from "react";
import fs from "fs";
import path from "path";
import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";

import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getNameFromSlug, toTitleCase } from "../../../helpers";

import styles from "../../../styles/Learning.module.css";
import { useTheme } from "../../../context/ThemeContext";

interface ILearningSeries {
  series: string;
  indexContent: string;
}

const LearningSeries: NextPage<ILearningSeries> = (props) => {
  const { series, indexContent } = props;
  const { isDarkTheme } = useTheme();
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
          <h2
            className={styles.pointer}
            style={{ color: isDarkTheme ? "#ced6e0" : "#3d3d3d" }}
          >
            &#8592;&nbsp;&nbsp;Learning
          </h2>
        </Link>
        <h3 className={styles.mt1}>{title}</h3>
        <div ref={seriesIndexRef}></div>
      </main>
      <Footer />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  const series = ctx.params?.series;
  const indexContent = fs.readFileSync(
    path.resolve(`content/learning/${series}/index.md`),
    "utf-8"
  );

  return {
    props: { series, indexContent },
  };
}

export default LearningSeries;
