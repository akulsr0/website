import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getUserActivity, Activity } from "gh-recent-activity";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

interface HomeProps {
  homeContent: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

const Home: NextPage<HomeProps> = (props) => {
  const { homeContent } = props;
  const { theme } = useTheme();
  const [recentActivity, setRecentActivity] = useState<Activity>();

  useEffect(() => {
    getUserActivity("akulsr0", { includeEmoji: true }).then(
      (resp: Activity) => {
        setRecentActivity(resp);
      }
    );
  }, []);

  return (
    <Container>
      <Head />
      <Header />
      <main className="main-content">
        <MDXRemote
          {...homeContent}
          components={{ Link, Image }}
          scope={{ theme, recentActivity }}
        />
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
