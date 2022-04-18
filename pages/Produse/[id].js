import React, { useState } from "react";
import { commerce } from "../../lib/commerce";
import styles from "../../styles/ProductPage.module.css";
import Image from "next/image";
import Head from "next/head";
import LoadingScreen from "../../components/LoadingScreen";

export const getStaticPaths = async () => {
  const { data: products_1 } = await commerce.products.list({
    limit: 15,
    category_slug: "1",
  });
  const { data: products_2 } = await commerce.products.list({
    limit: 15,
    category_slug: "2",
  });
  const products = [...products_1, ...products_2];

  const paths = products.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const singleProduct = await commerce.products.retrieve(id);

  return {
    props: { item: singleProduct },
    revalidate: 5,
  };
};

const Details = ({ item }) => {
  if (!item) {
    return <LoadingScreen actualizare="Actualizare produs..." />;
  }

  const [currentImage, setCurrentImage] = useState(item.media.source);

  return (
    <div
      className={
        styles.product__container +
        " w-100 d-flex justify-content-center align-items-start align-items-md-center"
      }
    >
      <Head>
        <title>{item.name}</title>
      </Head>
      <div
        className={
          styles.product__midContainer +
          " m-0 p-0 d-flex justify-content-center flex-column flex-md-row p-2 p-md-0"
        }
      >
        <div className={styles.product__imagesContainer + " pe-0 pe-md-4"}>
          <div className={styles.product__bigImageContainer + " "} id="slider1">
            <Image
              layout="intrinsic"
              as="image"
              src={currentImage.slice(20)}
              width={1920}
              height={1080}
            />
          </div>
          <div
            className={
              styles.product__smallImagesContainer +
              " d-flex py-2 justify-content-start justify-content-md-center gap-1"
            }
          >
            {item.assets.map((item) => (
              <div key={item.id} className={styles.product__smallImage}>
                <Image
                  src={item.url.slice(20)}
                  layout="intrinsic"
                  width={120}
                  height={72}
                  onClick={() => setCurrentImage(item.url)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.product__content}>
          <h4>{item.name}</h4>
          <div
            className={styles.product__description}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
          <h4>
            Pret: {item.price.raw} <sub>ron</sub>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Details;
