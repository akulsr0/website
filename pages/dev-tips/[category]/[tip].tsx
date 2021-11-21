import { useEffect, useRef } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import matter from "gray-matter";
import marked from "marked";
import path from "path";
import fs from "fs";

import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Head from "../../../components/_head";

interface ITip {
  data: {
    title: string;
    category: string;
  };
  content: string;
}

interface DevTipProps {
  tip: ITip;
}

const DevTip: NextPage<DevTipProps> = (props) => {
  const title = props?.tip?.data.title || "";
  const content = props?.tip?.content;
  const tipContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("hit...");
    content &&
      tipContentRef.current &&
      (tipContentRef.current.innerHTML += marked(content));
  }, [content]);

  return (
    <Container>
      <Head title={title} />
      <Header />
      <br />
      <h3>{title}</h3>
      <div ref={tipContentRef}>
        <br />
      </div>
      <Footer />
    </Container>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const params = ctx.params!;
  const { category, tip } = params;

  const tipsPath = path.join(`content/dev-tips/${category}`);
  const tips = fs.readdirSync(tipsPath);
  const _tip = tips.find((b) => b.toLowerCase().includes(tip as string))!;
  const tipContent = fs.readFileSync(
    path.join(`content/dev-tips/${category}/${_tip}`),
    "utf-8"
  );
  const { data, content } = matter(tipContent);

  return { props: { tip: { data, content } } };
}

export async function getStaticPaths() {
  const paths: Array<{ params: { category: string; tip: string } }> = [];

  const devTipsCategoriesPath = path.join("content/dev-tips");
  const devTipsCategories = fs.readdirSync(devTipsCategoriesPath);
  devTipsCategories.forEach((category) => {
    const devTips = fs.readdirSync(`content/dev-tips/${category}`);
    devTips.forEach((tip) => {
      const path = {
        params: {
          category,
          tip: tip.split("-").slice(1).join("-").replace(".md", ""),
        },
      };
      paths.push(path);
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export default DevTip;
