import type { NextPage } from "next";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Offline: NextPage = () => {
  return (
    <Container>
      <Header />
      <main>
        <h2>Sorry, page cannot be loaded since you`&apos;re offline</h2>
      </main>
      <Footer />
    </Container>
  );
};

export default Offline;
