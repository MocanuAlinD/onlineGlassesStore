import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "../styles/navbar.module.css";
import { BiSun, BiMoon } from "react-icons/bi";
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = ({ totalItems }) => {
  const [state, setState] = useState(true);
  const [themeIcon, setThemeIcon] = useState(null);
  const router = useRouter();

  const { data: session } = useSession();

  const changeMe = () => {
    let a = document.querySelector("ul");
    if (state) {
      a.style.right = "0";
      setState(false);
    } else {
      a.style.right = "-100%";
      setState(true);
    }
  };

  const closeMenu = () => {
    let a = document.querySelector("ul");
    a.style.right = "-100%";
    setState(true);
  };

  const changeTheme = () => {
    const item = localStorage.getItem("theme");
    if (item === "false") {
      document.body.classList.value = "dark";
      localStorage.setItem("theme", true);
      setThemeIcon(false);
    } else {
      document.body.classList.value = "";
      localStorage.setItem("theme", false);
      setThemeIcon(true);
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "true") {
          document.body.classList.value = "dark";
          setThemeIcon(false);
        } else if (localStorage.getItem("theme") === "false") {
          document.body.classList.value = "";
          setThemeIcon(true);
        }
      } else {
        localStorage.setItem("theme", false);
        document.body.classList.value = "";
      }
    } catch (error) {
      console.log("No theme available.");
    }
  }, []);

  return (
    <div className={style.nav} id="nav">
      <div className={style.nav__title}>
        <Link href="/">
          {/* <a onClick={closeMenu}>Acasa</a> */}
          <h3>HORUS TOP OPTIC</h3>
        </Link>
      </div>
      <ul>
        <li>
          <Link href="/">
            <a onClick={closeMenu}>Acasa</a>
          </Link>
        </li>
        <li>
          <Link href="/Produse">
            <a onClick={closeMenu}>Produse</a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a onClick={closeMenu}>FAQ</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a onClick={closeMenu}>Contact</a>
          </Link>
        </li>

        {session && (
          <li>
            <img src={session.user.image} alt="user image" />
            <Link href="/">
              <a onClick={() => (signOut(), closeMenu())}>Log out</a>
            </Link>
          </li>
        )}
        {!session && (
          <li>
            <Link href="/recenzii">
              <a onClick={closeMenu}>Log in</a>
            </Link>
          </li>
        )}
      </ul>
      <button className={style.nav__menu} onClick={changeMe}>
        Meniu
      </button>
      <div className={style.nav__cartContainer}>
        {router.pathname !== "/Cart" && router.pathname !== "/Checkout" && (
          <Link href="/Cart">
            <IconButton
              className={style.nav__cartIcon}
              aria-label="Show cart items"
              title="Vezi produsele din cos"
            >
              <Badge
                badgeContent={totalItems}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        )}
      </div>

      <div
        className={style.theme_color_container}
        onClick={() => changeTheme()}
      >
        <div className={style.sun}>
          {themeIcon === true ? (
            <BiSun className={style.sunIcon} />
          ) : (
            <BiMoon className={style.sunIcon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
