import { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getUserActivity, Activity } from "gh-recent-activity";

import defaults from "../constants/default.json";
import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecentActivity from "../components/RecentActivity";
import RecentContent from "../components/RecentContent";
import { useTheme } from "../context/ThemeContext";

interface HomeProps {
  homeContent: MDXRemoteSerializeResult;
  recentContent: Record<string, unknown>[];
}

const HomeStyles = () => {
  const { theme } = useTheme();
  const css = `
  .intro img {
    width: 124px;
    height: 164px;
    float: left;
    margin-right: 12px;
  }
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    list-style: none;
    column-gap: 0.6rem;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem 0.4rem;
    margin-top: 1rem;
  }
  .box {
    background: ${theme === "dark" ? "#7ed6dfbb" : "#eeeeee"};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 0.6rem;
    border-radius: 0.2rem;
    font-size: 0.9rem;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
  .box span {
    margin-left: 0.5rem;
  }
  .recent-activity-list {
    display: block;
    min-height: 300px;
  }
`;
  return <style>{css}</style>;
};

const Home: NextPage<HomeProps> = (props) => {
  const { homeContent, recentContent } = props;
  const [recentActivity, setRecentActivity] = useState<Activity[]>();

  const { show_recent_activity: showRecentActivity } = defaults;

  useEffect(() => {
    if (showRecentActivity) {
      getUserActivity("akulsr0", { includeEmoji: true }).then((resp) => {
        setRecentActivity(resp);
      });
    }
  }, []);

  const components = useMemo(
    () => ({
      Link,
      Image,
      HomeStyles,
      RecentActivity: () => (
        <RecentActivity activity={recentActivity ?? []} show={showRecentActivity} />
      ),
      RecentContent: () => <RecentContent recentContent={recentContent} />,
    }),
    [recentActivity, showRecentActivity, recentContent]
  );

  return (
    <Container>
      <Head />
      <Header />
      <main className="main-content">
        <MDXRemote {...homeContent} components={components} />
      </main>
      <Footer enableFooterMargin={false} />
    </Container>
  );
};

export async function getStaticProps() {
  const homeContentPath = path.join("content");
  const homeContent = fs.readFileSync(homeContentPath + "/Home.mdx", "utf-8");
  const { content } = matter(homeContent);
  const outputContent = await serialize(content);

  const recentContent = JSON.parse(
    fs.readFileSync("content/allContent.json", "utf-8"),
  );

  return { props: { homeContent: outputContent, recentContent } };
}

export default Home;
