import React, { useState } from "react";
import Stars from "../components/Stars";
import styles from "../styles/recenziiCard.module.css";

const ReviewCard = ({ item }) => {
  const [error, setError] = useState(false);

  return (
    <div className={styles.reviewItem}>
      <div
        className={
          styles.imageName +
          " m-0 p-0 d-flex justify-content-start align-items-center"
        }
      >
        <img
          src={!error ? item.picture : "/notAvailable1.png"}
          onError={() => setError(true)}
        />
        <h4 className="m-0 p-0">{item.name}</h4>
      </div>
      <h5 className="m-0 p-2">&nbsp;&nbsp;&nbsp;&nbsp;{item.review}</h5>
      <Stars item={item.rating} />
    </div>
  );
};

export default ReviewCard;
