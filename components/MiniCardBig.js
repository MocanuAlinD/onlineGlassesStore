import React from "react";
import styles from "../styles/MiniCardBig.module.css";
import Image from "next/image";
import { IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";

const MiniCardBig = ({ produs, onAddToCart }) => {
  return (
    <div className={styles.container + " d-flex flex-column mx-3 my-1"}>
      <div className={styles.bg}></div>
      <div className={styles.imageContainer}>
        <Image
          layout="fill"
          priority
          as="image"
          src={produs.imgUrl.slice(20)}
        />
      </div>
      <div className={styles.pContainer}>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: produs.description }}
        ></p>
      </div>
    </div>
  );
};

export default MiniCardBig;
