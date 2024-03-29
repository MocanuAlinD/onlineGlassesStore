import React, { useState } from "react";
import styles from "../styles/components/Sidebar.module.css";
import {
  AiOutlineSearch,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { BsBoxArrowInUpRight, BsBoxArrowDownLeft } from "react-icons/bs";

const Sidebar = ({
  brand,
  setBrand,
  brandNames,
  setBrandNames,
  changeCat,
  setSearch,
  changePriceName,
  brandNameVedere,
  brandNameSoare,
  setCurrentCard,
}) => {
  const [src, setSrc] = useState("");

  const sendCategorie = (e) => {
    changeCat(e);
    const allBrandsMobile = document.querySelector("#brandMobile");
    const brands = document.querySelector("#divBrand");
    const pret = document.querySelector("#pret");
    pret.value = pret[0].value;
    if (e === "ochelariVedere") {
      brands.style.display = "flex";
      setBrandNames(brandNameVedere);

      allBrandsMobile.value = allBrandsMobile[0].value;
    }
    if (e === "ochelariSoare") {
      brands.style.display = "flex";
      allBrandsMobile.value = allBrandsMobile[0].value;
      setBrandNames(brandNameSoare);
    }

    if (e === "ochelariAccesorii") {
      brands.style.display = "none";
    }
  };

  const removeSearch = () => {
    setSrc("");
    setSearch("");
  };

  const changeCard = (e) => {
    setCurrentCard((prev) => e);
  };

  return (
    <div className={styles.container + " p-2 m-0 m-md-3 mt-3 mt-md-0"}>
      {/* Search */}
      <div className={styles.mobile__items + " " + styles.mobile__search}>
        <div className={styles.searchContainer + " pb-2"}>
          <AiOutlineSearch className={styles.searchIconDrop} />
          <input
            placeholder="Cauta..."
            type="text"
            className={styles.searchDrop}
            spellCheck="false"
            onChange={(e) => setSrc(e.target.value.toLowerCase())}
            value={src}
          />
        </div>
        <div
          className={
            styles.searchButtons +
            " p-0 m-0 pb-1 pb-md-0 gap-3 d-flex justify-content-end justify-content-md-between"
          }
        >
          <button
            className={styles.searchSterge}
            onClick={removeSearch}
            disabled={!src}
          >
            Sterge
          </button>
          <button
            className={styles.searchCauta}
            onClick={() => setSearch(src)}
            disabled={!src}
          >
            Cauta
          </button>
        </div>
      </div>

      {/* Categorie RAME-ACCESORII */}
      <div className={styles.mobile__items}>
        <h4>Categorii</h4>
        <select
          name="arataMobile"
          id="arataMobile"
          onChange={(e) => sendCategorie(e.target.value)}
        >
          <option value="ochelariVedere">Ochelari vedere</option>
          <option value="ochelariSoare">Ochelari soare</option>
          <option value="ochelariAccesorii">Accesorii</option>
        </select>
      </div>

      {/* BRANDS */}
      <div className={styles.mobile__items} id="divBrand">
        <h4>Brand</h4>
        <select
          name="brand"
          id="brandMobile"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="marcaAll">Toate</option>

          {brandNames.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.mobile__items} id="divPret">
        <h4>
          <AiOutlineArrowDown />
          <AiOutlineArrowUp />
        </h4>
        <select id="pret" onChange={(e) => changePriceName(e.target.value)}>
          <optgroup label="Pret"></optgroup>
          <option value="mic">Pret mic</option>
          <option value="mare">Pret mare</option>
          {brand === "marcaAll" && (
            <>
              <optgroup label="Nume"></optgroup>
              <option value="atoz">A - Z</option>
              <option value="ztoa">Z - A</option>
            </>
          )}
        </select>
      </div>

      <div
        className={
          styles.buttonsContainer +
          " m-0 p-0 my-3 mb-2 w-100 d-flex justify-content-end justify-content-md-evenly align-items-center"
        }
      >
        <BsBoxArrowDownLeft
          className={styles.arrows + " me-5 mx-md-0"}
          onClick={() => changeCard("small")}
        />
        <BsBoxArrowInUpRight
          className={styles.arrows + " me-2"}
          onClick={() => changeCard("large")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
