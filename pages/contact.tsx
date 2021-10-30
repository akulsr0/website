import { NextPage } from "next";
import { useEffect, useRef } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

import Container from "../components/Container";
import Header from "../components/Header";
import Head from "../components/_head";
import Footer from "../components/Footer";

interface ContactProps {
  contactContent: string;
}

const Contact: NextPage<ContactProps> = (props) => {
  const { contactContent } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactContentMarkup = marked(contactContent);
    contentRef.current && (contentRef.current.innerHTML = contactContentMarkup);
  }, []);

  return (
    <Container>
      <Head title="Contact" />
      <Header />
      <br />
      <div ref={contentRef}></div>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const contactContentPath = path.join("content");
  const contactContent = fs.readFileSync(
    contactContentPath + "/Contact.md",
    "utf-8"
  );
  const { content } = matter(contactContent);
  return { props: { contactContent: content } };
}

export default Contact;
