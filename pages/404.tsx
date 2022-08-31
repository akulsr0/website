import { NextPage } from "next";

import Container from "../components/Container";
import Head from "../components/_head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound: NextPage = () => {
  return (
    <Container>
      <Head
        title="Not Found"
        metaDescription="I am Akul, self trained software developer. I have done bachelors in Computer Science Engineering from Babu Banarasi Das: National Institute of Technology and Management, Lucknow."
      />
      <Header />
      <br />
      <div className="not-found-wrapper">
        <p>Oops, page not found!</p>
      </div>
      <Footer />
    </Container>
  );
};

export default NotFound;
