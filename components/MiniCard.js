import React from "react";
import styles from "../styles/components/MiniCard.module.css";
import Image from "next/image";
import { IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";

const MiniCard = ({ produs, onAddToCart }) => {
  return (
    <div
      className={
        styles.miniCard__container + " d-flex flex-column p-1 m-2 mt-3"
      }
    >
      {/* <Image
        layout="intrinsic"
        priority
        as="image"
        src={produs.imgUrl.slice(20)}
        width={768}
        height={432}
        className={styles.image}
        placeholder="blur"
        blurDataURL="no-image.png"
      /> */}
      <div className={styles.image_container}>
      <Image
          layout="fill"
          priority
          as="image"
          src={produs.imgUrl.slice(20)}
          placeholder="blur"
          blurDataURL="no-image.png"
        />
      </div>

      <h4>{produs.name}</h4>
      <h5 className={styles.miniCard__pret}>
        {produs.price ? produs.price : "-"}
      </h5>

      <hr className={styles.miniCard__divider} />
      <h5 className={styles.h5tag}>
        {!produs.inventory.managed
          ? "In stoc"
          : produs.inventory.available < 1
          ? "Doar cu precomanda"
          : produs.inventory.available < 4
          ? "Stoc limitat"
          : "In stoc"}{" "}
      </h5>

      {!produs.inventory.managed ? (
        <div className={styles.miniCard__cartContainer}>
          <IconButton onClick={() => onAddToCart(produs.id, 1)}>
            <ShoppingCart className={styles.miniCard__shopIcon} />
          </IconButton>
        </div>
      ) : produs.inventory.available < 1 ? (
        <div className={styles.miniCard__linkDisabled}>
          <IconButton className={styles.miniCard__shopIconDisabled}>
            <ShoppingCart />
          </IconButton>
        </div>
      ) : (
        <div className={styles.miniCard__cartContainer}>
          <IconButton
            onClick={() => onAddToCart(produs.id, 1)}
            title="Adauga in cos"
          >
            <ShoppingCart className={styles.miniCard__shopIcon} />
          </IconButton>
        </div>
      )}

      <div className={styles.miniCard__details}>
        <Link href={"/Produse/" + produs.id}>
          <a target="_blank">
            <FiMoreHorizontal title="Vezi detalii produs" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MiniCard;
