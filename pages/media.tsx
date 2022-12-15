import * as React from "react";
import fs from "fs";
import Image from "next/image";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "../components/_head";

import styles from "../styles/Media.module.css";

type GalleryCollection = { title: string; images: string[] };
type GalleryType = Record<string, GalleryCollection>;

interface IMediaProps {
  gallery: GalleryType;
}

const ImageGallery = (props: { gallery: GalleryCollection }) => {
  const { gallery } = props;
  return (
    <div key={gallery.title} className={styles.gallery}>
      <h4>{gallery.title}</h4>
      <div className={styles.images}>
        {gallery.images.reverse().map((img) => (
          <Image
            key={img}
            width={130}
            height={130}
            src={`/images/akul/${img}`}
            alt={img}
            priority
          />
        ))}
      </div>
    </div>
  );
};

const MediaGallery = (props: IMediaProps) => {
  const { gallery } = props;

  return (
    <Container>
      <Head title="Media Gallery" />
      <Header />
      <main className="main-content">
        <h3>Akul Srivastava - Media Log</h3>
        {Object.values(gallery).map((gallery) => (
          <ImageGallery key={gallery.title} gallery={gallery} />
        ))}
      </main>
      <Footer />
    </Container>
  );
};

export const getStaticProps = () => {
  const images = fs
    .readdirSync("public/images/akul")
    .filter((file) => /\.(jpe?g|png|gif|bmp)$/i.test(file)); // filter in only images

  const gallery: GalleryType = {
    graphic: {
      title: "Graphic Images",
      images: [],
    },
    others: {
      title: "Other Images",
      images: [],
    },
  };

  images.forEach((img) => {
    if (img.startsWith("anim")) {
      gallery.graphic.images.push(img);
    } else {
      gallery.others.images.push(img);
    }
  });

  return {
    props: {
      gallery,
    },
  };
};

export default MediaGallery;
