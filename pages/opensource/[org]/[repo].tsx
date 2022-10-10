import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../../styles/Opensource.module.css";
import { api } from "../../../services/APIService";
import { getFormattedPRData } from "../../../helpers";

function getPRState(pr: Record<string, any>) {
  if (pr.isOpen) return { state: "open", color: "limegreen" };
  if (pr.isMerged) return { state: "merged", color: "blueviolet" };
  return { state: "closed", color: "red" };
}

const Repository: React.FC<null> = (): JSX.Element => {
  const router = useRouter();
  const { org, repo } = router.query;
  const [data, setData] = useState<Array<Record<string, any>>>();

  useEffect(() => {
    if (org && repo) {
      const options = { org: org as string, repo: repo as string };
      api.getPullRequests(
        options,
        (err: any, data: Record<string, any> | null) => {
          if (err) return;
          const formattedData = data!.items.map((item: Record<string, any>) =>
            getFormattedPRData(item)
          );
          setData(formattedData);
        }
      );
    }
  }, [org, repo]);

  if (!org || !repo) return <></>;

  return (
    <Container>
      <Head title={`OSS @ ${org}/${repo}`} />
      <Header />
      <br />
      <section>
        <h2>
          {org}/{repo}
        </h2>
        {data &&
          data.map((oss) => (
            <div className={styles.ossCard} key={oss.url}>
              <div>
                <a href={oss.url} target="_blank" rel="noreferrer">
                  {oss.title}
                </a>
                <p>#{oss.prNumber}</p>
              </div>
              <p>
                <span style={{ backgroundColor: getPRState(oss).color }}>
                  {getPRState(oss).state}
                </span>
                {!oss.isOpen && `on ${oss.closedAt}`}
              </p>
            </div>
          ))}
      </section>
      <Footer />
    </Container>
  );
};

export default Repository;
