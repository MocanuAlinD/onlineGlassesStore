import React, { useState } from "react";
import styles from "../styles/recenzii.module.css";
import { useSession, signIn } from "next-auth/react";
import { FaStar, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import firebase from "../firebase";

const Recenzii = () => {
  const { data: session } = useSession();

  const [maxChar, setMaxChar] = useState(0);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);

  const postData = () => {
    if (session.user.name && session.user.image && text && rating) {
      firebase.child("Contacts").push({
        picture: session.user.image,
        name: session.user.name,
        review: text,
        rating: rating,
      });
      setText("");
      setRating(1);
      setMaxChar(0);
    } else {
      alert("Nu ai scris nimic.");
    }
  };

  const checkLen = (e) => {
    setMaxChar(e.length);
    setText(e);
  };

  return (
    <div className={styles.recenzii__container+ " m-0 p-0 d-flex flex-grow-1 justify-content-center align-items-center h-100"}>
      {!session && (
        <div className={styles.recenzii__noSession + " d-flex flex-column p-3"}>
          <h4>Te rugam sa te autentifici pentru a lasa un review</h4>
          <div className={styles.loginButtonsContainer + " m-0 p-0 mx-auto d-flex flex-column justify-content-center"}>
            <button
              onClick={() => signIn("google")}
              className={styles.googleBtn}
            >
              <FcGoogle className={styles.googleIcon}/>
              Google
            </button>
            <button
              onClick={() => signIn("facebook")}
              className={styles.facebookBtn}
            >
              <FaFacebook className={styles.facebookIcon}/>
              Facebook
            </button>
          </div>
        </div>
      )}

      {session && (
        <div className={styles.recenzii__session + " p-3 my-5"}>
          <div className={styles.recenzii__sessionHeader + " d-flex justify-content-start align-items-center w-100 pb-2"}>
            <img
              src={session.user.image}
              alt=""
              width="50"
              height="50"
              className=' me-2'
            />
            <h4 className='m-0 p-0'>{session.user.name}</h4>
          </div>
          <div className={styles.recenzii__sessionFooter}>
            <textarea
              name="review"
              cols="30"
              rows="10"
              spellCheck="false"
              maxLength="100"
              value={text}
              onChange={(e) => checkLen(e.target.value)}
            ></textarea>
            <div className={styles.recenzii__rating + " m-0 p-0 d-flex justify-content-between align-items-center"}>
              <h4 className='m-0 p-0'>Rating</h4>
              <div className={styles.recenzii__onlyStars + " d-flex py-1"}>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i} className='d-flex flex-column'>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className={styles.recenzii__star}
                        color={
                          ratingValue <= rating
                            ? "var(--color-primary-light)"
                            : "var(--color-primary-lighten2)"
                        }
                        size="20"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className={styles.recenzii__bottom + " m-0 p-0 d-flex flex-column gap-0"}>
              <h5 className='text-end py-1'>{maxChar}/100</h5>
              <button onClick={postData}>Posteaza</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recenzii;
