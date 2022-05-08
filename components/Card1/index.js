import React from "react";
import Arrows from "../Arrows";
import Link from "next/link";
import styles from "../../styles/card1.module.css"

const Card1 = ({ indexData }) => {
  const shorten = (text, maxLength) => {
    if (text && text.length >= maxLength) {
      return text.substr(0, maxLength) + "...";
    }
    return text.substr(0, maxLength);
  };

  return (
    <div className={styles.container + ' d-flex p-2 me-3 flex-column align-items-md-end align-items-center m-0 p-0'}>
      <div className={styles.mission + " my-2"}>
        <h3 className='d-flex justify-content-between align-items-center'>
          Misiunea noastra
          <Arrows />
        </h3>

        <ul className={styles.ulMission + ' '}>
          {/* <hr style={{ height: ".1rem", margin: ".2rem 0", color: 'white' }} /> */}
          <li>
            Preturi incepand de la 100 lei perechea de ochelari
          </li>
          <li>
            Garantie 2 ani la toate produsele comercializate
          </li>
          <li>
            Posibilitatea achitarii produselor achizitionate, in mai multe rate
            lunare stabilite de comun acord - <strong>FARA DOBANDA</strong>
          </li>
          <li>
            Oferirea de consultatii optometrice profesioniste gratuite
            indiferent daca se achizitioneaza sau nu produsele companiei.
          </li>
          <li>
            Consultanta de specialitate cu privire la tipurile de protectie
            necesare pentru ochi (in functie de domeniul de activitate).
          </li>
          <li>
            Furnizarea de produse si servicii de calitate superioara si la
            preturi minime.
          </li>
          <li>
            Informarea clientilor despre afectiunile ochilor.
          </li>
          <li>
            Informarea clientilor despre noutatile din lumea opticii medicale
            (tip rame, tip lentile etc).
          </li>
        </ul>
      </div>

      {indexData.map((item) => (
        <div key={item.id} className={styles.cards + ' my-2 d-flex flex-column align-items-between'}>
          <h3 className={styles.cardTitle + ' mt-2 px-3'}>
            {item.title}
            <Arrows />
          </h3>

          <div className={styles.forHide + ' px-2'}>
            <hr color="#cfdbd5" style={{ height: ".1rem" }} />
            {/* <h4 className={styles.cardText + ' '}>{shorten(item.text, 200)}</h4> */}
            <h4 className={styles.cardText}>{item.text}</h4>
            <div className={styles.cardButton}>
              <Link href={item.url}>
                <a>{item.button}</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card1;
