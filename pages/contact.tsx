import { useState } from "react";
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
import styles from "../styles/Contact.module.css";

import defaults from "../constants/default.json";
import { api } from "../services/APIService";

interface ContactProps {
  contactContent: string;
}

const DirectContact: React.FC = () => {
  if (!defaults.show_contact_form) return null;

  const [message, setMessage] = useState<string | null>(null);

  function onSend() {
    if (!message || message === "") {
      return alert("Message can't be empty");
    }
    api.sendContactMessage(
      message,
      (err: any, data: Record<string, any> | null) => {
        if (err || !data?.success) return null;
        alert("Your message has been sent.");
      }
    );
  }

  return (
    <div className={styles.directContact}>
      <textarea
        placeholder="You can write up here also"
        onChange={(e) => setMessage(e.target.value!)}
      ></textarea>
      <button onClick={onSend}>Send</button>
    </div>
  );
};

const Contact: NextPage<ContactProps> = (props) => {
  const { contactContent } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactContentMarkup = marked(contactContent);
    contentRef.current && (contentRef.current.innerHTML = contactContentMarkup);
  }, []);

  return (
    <Container>
      <Head
        title="Contact"
        metaDescription="If you have any feedback or would like to say something, you can dm me on instagram or mail me at below address."
      />
      <Header />
      <br />
      <div id="content" ref={contentRef} />
      <DirectContact />
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
