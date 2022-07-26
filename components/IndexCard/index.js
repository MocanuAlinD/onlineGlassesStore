import React from "react";
import Arrows from "../Arrows";
import Link from "next/link";
import styles from "../../styles/IndexCard.module.css";

const IndexCard = () => {
  const INDEX_DATA = [
    {
      id: 1,
      title: "Cu ce ne ocupam",
      text: "Consultatii optica medicala gratuite indiferent daca se achizitioneaza sau nu produsele companiei. Furnizarea de produse si servicii de calitate superioara si la preturi minime.",
      button: "Citeste mai mult",
      url: "/Ocupa",
    },
    {
      id: 2,
      title: "Consultanță",
      text: "ONLINE DEMO STORE se adreseaza persoanelor care sunt in cautarea unor servicii prompte si de calitate, totul pentru un pret corect.",
      button: "Citeste mai mult",
      url: "/Consultanta",
    },
    {
      id: 3,
      title: "Despre noi",
      text: "ONLINE DEMO STORE desfasoara programul de servicii de optica medicala si protectia vederii pentru angajatii companiilor. Ochelari de vedere, rame, lentile de contact, ochelari de soare.",
      button: "Citeste mai mult",
      url: "/DespreNoi",
    },
  ];

  return (
    <div className="d-flex p-2 mx-sm-3 flex-column align-items-md-end align-items-center mx-0">
      <div className={styles.mission + " my-2"}>
        <h3 className="d-flex justify-content-between align-items-center">
          Misiunea noastra
          <Arrows />
        </h3>

        <ul className={styles.ulMission + " "}>
          <li>Preturi incepand de la 100 lei perechea de ochelari</li>
          <li>Garantie 2 ani la toate produsele comercializate</li>
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
          <li>Informarea clientilor despre afectiunile ochilor.</li>
          <li>
            Informarea clientilor despre noutatile din lumea opticii medicale
            (tip rame, tip lentile etc).
          </li>
        </ul>
      </div>

      {/* Last 3 card from index page */}
      {INDEX_DATA.map((item) => (
        <div
          key={item.id}
          className={
            styles.cards + " my-2 d-flex flex-column align-items-between"
          }
        >
          <h3 className={styles.cardTitle + " mt-2 px-3"}>
            {item.title}
            <Arrows />
          </h3>

          <div className={styles.forHide + " px-2"}>
            <hr color="#cfdbd5" style={{ height: ".1rem" }} />
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

export default IndexCard;
