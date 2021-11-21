import { NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Head from "../../components/_head";

interface DevTipsProps {
  contents: Array<string>;
}

const DevTips: NextPage<DevTipsProps> = (props) => {
  const { contents } = props;

  const DevTipsList = (
    <ul>
      {contents.map((c) => (
        <li key={c}>
          <Link href={`/dev-tips/${c}`}>{c}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Container>
      <Head title="Dev Tips" />
      <Header />
      <br />
      <h3>dev tips</h3>
      {DevTipsList}
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const contentPath = path.join("content/dev-tips");
  const contents = fs.readdirSync(contentPath);
  return { props: { contents: contents.sort() } };
}

export default DevTips;
