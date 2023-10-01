import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import moment from "moment";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Github from "../components/icons/Github";

import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Work.module.css";

interface WorkProps {
  workContent: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

const Work: NextPage<WorkProps> = (props) => {
  const { workContent } = props;
  const { isDarkTheme } = useTheme();
  const expCalloutRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const start = moment([2020, 11, 16]);
    const now = moment();
    const duration = moment.duration(now.diff(start));
    const [y, m, d, h] = [
      duration.years(),
      duration.months(),
      duration.days(),
      duration.hours(),
    ];
    const exp = `${y} years ${m} months ${d} days ${h} hours`;
    expCalloutRef.current!.innerText = exp;
  }, [isDarkTheme]);

  useEffect(() => {
    const workWrapperChilds =
      document.getElementById("work-wrapper")?.children || [];
    const workWrapperChildsExceptLast = Array.from(workWrapperChilds).slice(
      0,
      workWrapperChilds.length - 2
    );
    const workLineHeight = workWrapperChildsExceptLast.reduce(
      (acc, val) => acc + val.clientHeight + 21,
      0
    );
    const workLine = document.getElementById("work-line")!;
    workLine.style.height = `${workLineHeight}px`;
  }, []);

  return (
    <Container>
      <Head title="Work" />
      <Header />
      <article className="main-content">
        <h2 style={{ marginBottom: "1rem" }}>Work Experience</h2>
        <MDXRemote
          {...workContent}
          components={{ Github, Link }}
          scope={{ styles, isDarkTheme, expCalloutRef }}
        />
      </article>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const workContentPath = path.join("content");
  const workContent = fs.readFileSync(workContentPath + "/Work.mdx", "utf-8");
  const { content } = matter(workContent);
  const outputContent = await serialize(content);
  return { props: { workContent: outputContent } };
}

export default Work;
