import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import moment from "moment";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Github from "../components/icons/Github";

import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Work.module.css";

const Work: NextPage = () => {
  const { isDarkTheme } = useTheme();
  const expCalloutRef = useRef<HTMLDivElement>(null);

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
      workWrapperChilds.length - 2,
    );
    const workLineHeight = workWrapperChildsExceptLast.reduce(
      (acc, val) => acc + val.clientHeight + 21,
      0,
    );
    const workLine = document.getElementById("work-line")!;
    workLine.style.height = `${workLineHeight}px`;
  }, [isDarkTheme]);

  const pointerStyle = { background: isDarkTheme ? "#7ed6df" : "#ccc" };

  return (
    <Container>
      <Head title="Work" />
      <Header />
      <article className="main-content">
        <h2 style={{ marginBottom: "1rem" }}>Work Experience</h2>

        <div className={styles.expCallout} ref={expCalloutRef}></div>

        <div className={styles.workWrapper} id="work-wrapper">
          <div id="current">
            <div className={styles.pointer}></div>
            <h3>Software Engineer II - Fullstack</h3>
            <a
              className={styles.orgLink}
              href="https://smallcase.com"
              target="_blank"
              rel="noreferrer"
            >
              CASE Platforms (smallcase)
            </a>
            <ul>
              <li>Built wealth management tech</li>
              <li>
                Worked on <strong>smallcase naming framework</strong> changes
                for publisher platform.
              </li>
              <li>
                Started to contribute to <strong>Publisher Backend</strong>.
              </li>
              <li>
                Worked with <strong>Gateway team</strong>, and contributed to
                the <strong>Personal Loans</strong> project.
              </li>
              <li>
                Developed the <strong>Fixed Deposits</strong> Landing Page on
                smallcase app.
              </li>
              <li>
                Worked on introducing <strong>Mutual Funds</strong> as an asset
                class for smallcases.
              </li>
              <li>
                Worked on the revamp of <strong>smallcase creation flow</strong>
                .
              </li>
              <li>
                Upgraded the tech-stack of multiple projects as part of
                engineering activities.
              </li>
            </ul>
            <Github
              style={{ marginTop: 12 }}
              asLink
              href="https://github.com/akul-smallcase"
            />
            <br />
            <small>(April 2024 - Present)</small>
          </div>

          <div>
            <div className={styles.pointer} style={pointerStyle}></div>
            <h3>Software Engineer I - Frontend</h3>
            <a
              className={styles.orgLink}
              href="https://smallcase.com"
              target="_blank"
              rel="noreferrer"
            >
              CASE Platforms (smallcase)
            </a>
            <ul>
              <li>
                Worked on <strong>Publisher&apos;s Team</strong> at smallcase.
              </li>
              <li>
                Revamped <strong>Microsite</strong> (manager&apos;s website for
                end users).
              </li>
              <li>
                Built <strong>Subscription Retargeting Widget</strong> (enables
                scheduling one-on-one session or callback from the manager) from
                scratch and integrated it into smallcase app.
              </li>
              <li>
                Worked on the UI revamp of <strong>Subscription Widget</strong>.
              </li>
            </ul>
            <Github
              style={{ marginTop: 12 }}
              asLink
              href="https://github.com/akul-smallcase"
            />
            <br />
            <small>(Oct 2022 - March 2024)</small>
          </div>

          <div>
            <div className={styles.pointer} style={pointerStyle}></div>
            <h3>Software Engineer I - Frontend</h3>
            <a
              className={styles.orgLink}
              href="https://vogo.in"
              target="_blank"
              rel="noreferrer"
            >
              Vogo Automotive Pvt. Ltd.
            </a>
            <ul>
              <li>
                Contributed to different projects including Consumer PWA
                (React), iOS Application (React Native), Website (WordPress),
                etc...
              </li>
              <li>Built the exchange scooter feature from scratch.</li>
              <li>
                Worked on VOGO&apos;s website revamp and built the careers&apos;
                website.
              </li>
              <li>
                Added GitHub Actions to ensure Coding Guidelines checks,
                monitoring bundle size difference, and running unit tests.
              </li>
            </ul>
            <Github
              style={{ marginTop: 12 }}
              asLink
              href="https://github.com/akul-srivastava"
            />
            <br />
            <small>(July 2021 - Oct 2022)</small>
          </div>

          <div>
            <div className={styles.pointer} style={pointerStyle}></div>
            <h3>Software Engineer Intern</h3>
            <a
              className={styles.orgLink}
              href="https://vogo.in"
              target="_blank"
              rel="noreferrer"
            >
              Vogo Automotive Pvt. Ltd.
            </a>
            <ul>
              <li>
                Worked on the redesign of the help section for better user
                experience.
              </li>
            </ul>
            <Github
              style={{ marginTop: 12 }}
              asLink
              href="https://github.com/akul-srivastava"
            />
            <br />
            <small>(Dec 2020 - June 2021)</small>
          </div>

          <span
            id="work-line"
            className={styles.line}
            style={pointerStyle}
          ></span>
        </div>

        <br />

        <p>
          Other than fulltime job, I have also contributed to these{" "}
          <Link href="/opensource">opensource projects</Link>.
        </p>
      </article>
      <Footer />
    </Container>
  );
};

export default Work;
