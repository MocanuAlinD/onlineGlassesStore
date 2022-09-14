import React, { useState } from "react";
import styles from "../styles/components/MiniCardBig.module.css";
import Image from "next/image";
import { IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

const MiniCardBig = ({ produs, onAddToCart }) => {
  return (
    <div className={styles.container + " m-0 p-0 m-2 d-flex flex-column"}>
      <div className={styles.bg} secondbg={"no-image.png"}>
        <div className={styles.rightSideBg}>
          <h4 className={styles.title}>{produs.name}</h4>
          <h5 className={styles.pret + " fs-3 text-decoration-underline"}>
            {produs.price ? produs.price + " lei" : "-"}
          </h5>
          <div className={styles.stoc}>
            <h5 className={styles.inventory}>
              {!produs.inventory.managed
                ? "In stoc"
                : produs.inventory.available < 1
                ? "Doar cu precomanda"
                : produs.inventory.available < 4
                ? "Stoc limitat"
                : "In stoc"}{" "}
            </h5>

            {!produs.inventory.managed ? (
              <div className={styles.cartContainer}>
                <IconButton onClick={() => onAddToCart(produs.id, 1)}>
                  <ShoppingCart className={styles.shopIcon} />
                </IconButton>
              </div>
            ) : produs.inventory.available < 1 ? (
              <div className={styles.cartContainer}>
                <IconButton className={styles.shopIconDisabled}>
                  <ShoppingCart />
                </IconButton>
              </div>
            ) : (
              <div className={styles.cartContainer}>
                <IconButton
                  onClick={() => onAddToCart(produs.id, 1)}
                  title="Adauga in cos"
                >
                  <ShoppingCart className={styles.shopIcon} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          layout="fill"
          priority
          as="image"
          src={produs.imgUrl.slice(20)}
          placeholder="blur"
          blurDataURL="no-image.png"
        />
      </div>
      <div className={styles.pContainer}>
        <p dangerouslySetInnerHTML={{ __html: produs.description }}></p>
      </div>
    </div>
  );
};

export default MiniCardBig;
