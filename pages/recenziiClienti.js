import React, { useState, useEffect } from "react";
import styles from "../styles/recenziiClienti.module.css";
import firebase from "../firebase";
import ReviewCard from "../components/ReviewCard";

const RecenziiClienti = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.child("Contacts").on("value", (s) => {
      if (s.val() !== null) {
        setData([...Object.values(s.val())]);
      } else {
        setData([]);
      }
    });
    return () => {
      setData([]);
    };
  }, []);


  return (
    <div className="w-100 align-self-start d-flex justify-content-center align-items-start">
      <div className={styles.reviewsContainer}>
        <h4 className={styles.title}>Parerea clientilor</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {data &&
            data.map((item, idx) => (
              <ReviewCard key={idx} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecenziiClienti;
