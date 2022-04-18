import React, { useState, useEffect } from "react";
import styles from "../styles/Produse.module.css";
import MiniCard from "../components/MiniCard";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import Head from "next/head";
import { commerce } from "../lib/commerce";

export async function getStaticProps() {
  const { data: products_1 } = await commerce.products.list({
    limit: 200,
    category_slug: "1",
    sortBy: "created",
  });
  const { data: products_2 } = await commerce.products.list({
    limit: 200,
    category_slug: "2",
    sortBy: "created",
  });

  const products = [];
  const both = [...products_1, ...products_2];

  both.map((item) => {
    const tempItem = {
      id: item.id,
      imgUrl: item.image.url,
      name: item.name,
      price: item.price.raw,
      inventory: item.inventory,
      categories: item.categories,
      description: item.description,
    };
    products.push(tempItem);
  });

  return {
    props: {
      products,
    },
    revalidate: 5,
  };
}

// =======================================================================
const Produse = ({ onAddToCart, products }) => {
  const listVedere = [];
  const listSoare = [];
  const listAccesorii = [];
  const brandNameV = [];
  const brandNameS = [];

  products.map((item) => {
    if (
      item.categories[0].slug === "rame" ||
      item.categories[1].slug === "rame"
    ) {
      if (item.description.includes("soare")) {
        listSoare.push(item);
        if (!brandNameS.includes(item.name)) {
          brandNameS.push(item.name);
        }
      } else {
        listVedere.push(item);
        if (!brandNameV.includes(item.name)) {
          brandNameV.push(item.name);
        }
      }
    }
    if (
      item.categories[0].slug === "accesorii" ||
      item.categories[1].slug === "accesorii"
    ) {
      listAccesorii.push(item);
    }
  });

  const brandNameVedere = brandNameV.sort(
    (a, b) => (a.toLowerCase() > b.toLowerCase() && 1) || -1
  );
  const brandNameSoare = brandNameS.sort(
    (a, b) => (a.toLowerCase() > b.toLowerCase() && 1) || -1
  );
  const listVedereLEN = listVedere.length;
  const listSoareLEN = listSoare.length;
  const listAccesoriiLEN = listAccesorii.length;

  const [brand, setBrand] = useState("marcaAll");
  const [search, setSearch] = useState("");
  const [def, setDef] = useState("mic");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPosts, setCurrentPosts] = useState(listVedereLEN);
  const [allProducts, setAllProducts] = useState(listVedere);
  const [brandNames, setBrandNames] = useState(brandNameVedere);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const changeBrand = () => {
    if (brand === "marcaAll") {
      return allProducts.slice(indexOfFirstPost, indexOfLastPost);
    }
    if (brand !== "marcaAll") {
      return allProducts.filter((m) => {
        return m.name && m.name === brand;
      });
    }
  };

  const changePriceName = (e) => {
    setDef(e);
    if (e === "mic") {
      return allProducts.sort(
        (a, b) => (parseInt(a.price) > parseInt(b.price) && 1) || -1
      );
    }
    if (e === "mare") {
      return allProducts.sort(
        (a, b) => (parseInt(a.price) < parseInt(b.price) && 1) || -1
      );
    }
    if (e === "atoz") {
      return allProducts.sort(
        (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() && 1) || -1
      );
    }
    if (e === "ztoa") {
      return allProducts.sort(
        (a, b) => (a.name.toLowerCase() < b.name.toLowerCase() && 1) || -1
      );
    }
  };

  const searchItems = () => {
    if (search === "") {
      return [];
    }
    const a = allProducts.filter((x) => {
      return (
        (x.name && x.name.toLowerCase().includes(search)) ||
        (x.description && x.description.toLowerCase().includes(search))
      );
    });
    return a;
  };

  // Change page
  const paginate = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    let buttons = document.querySelectorAll(".pagination__button");
    if (!buttons.length) return;
    console.log("Buttons:", buttons.length);
    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  };

  // Show products per page select
  const changeShow = (e) => {
    let buttons = document.querySelectorAll(".pagination__button");
    if (!buttons.length) return;
    buttons.forEach((btn) => btn.classList.remove("active"));
    buttons[0].classList.add("active");
    setPostsPerPage(e);
    setCurrentPage(1);
  };

  // Change category
  const changecat = (cat) => {
    setBrand("marcaAll");
    setCurrentPage(1);
    if (cat === "ochelariVedere") {
      setCurrentPosts(listVedereLEN);
      setAllProducts(listVedere);
    }
    if (cat === "ochelariSoare") {
      setCurrentPosts(listSoareLEN);
      setAllProducts(listSoare);
    }
    if (cat === "ochelariAccesorii") {
      setCurrentPosts(listAccesoriiLEN);
      setAllProducts(listAccesorii);
    }
    if (brand === "marcaAll") {
      let buttons = document.querySelectorAll(".pagination__button");
      if (!buttons.length) return;
      buttons.forEach((btn) => btn.classList.remove("active"));
      buttons[0].classList.add("active");
    }
  };

  return (
    <div className={styles.produse__container + " h-100 w-100"} id="top">
      <Head>
        <title>Produse</title>
      </Head>

      <div
        className={
          styles.produse__wrapper + " d-flex flex-column flex-md-row p-0 m-0"
        }
      >
        <Sidebar
          brand={brand}
          brandNames={brandNames}
          changeCat={(cat) => changecat(cat)}
          changePriceName={changePriceName}
          setSearch={setSearch}
          setBrand={setBrand}
          setBrandNames={setBrandNames}
          brandNameVedere={brandNameVedere}
          brandNameSoare={brandNameSoare}
        />

        <div className={styles.produse__list + " flex-grow-1"}>
          {search === "" && brand === "marcaAll" && (
            <Pagination
              setPostsPerPage={setPostsPerPage}
              postsPerPage={postsPerPage}
              totalPosts={currentPosts}
              paginate={paginate}
              changeShow={changeShow}
            />
          )}

          {search !== "" && (
            <h3
              className={
                styles.produse__searchResult + " m-0 p-0 my-4 text-center"
              }
            >
              {searchItems().length}{" "}
              {searchItems().length === 1 ? "produs" : "produse"}{" "}
              {searchItems().length === 1 ? "gasit" : "gasite"}
            </h3>
          )}
          {/* Products */}
          {search === "" && (
            <div className="m-0 p-0 d-flex flex-wrap justify-content-center justify-content-md-start">
              {changeBrand(allProducts).map((prd) => (
                <MiniCard onAddToCart={onAddToCart} key={prd.id} produs={prd} />
              ))}
            </div>
          )}

          {search !== "" ? (
            <div className="m-0 p-0 d-flex flex-wrap">
              {searchItems().map((prd) => (
                <MiniCard onAddToCart={onAddToCart} key={prd.id} produs={prd} />
              ))}
            </div>
          ) : (
            []
          )}
        </div>
      </div>
    </div>
  );
};

export default Produse;
