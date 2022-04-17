import React from "react";
import styles from "../styles/contact.module.css";
import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
} from "react-icons/ai";
import { ImMobile } from "react-icons/im";

const Contact = () => {
  const iconSize = "1.5rem";
  return (
    <div
      className={
        styles.contact__container +
        " h-100 m-0 p-0 d-flex justify-content-center align-items-center"
      }
    >
      <div className={styles.contact__social + " d-flex flex-column gap-2 my-5"}>
        <h4 className="py-2">Contact</h4>
        <ul className="m-0 p-0 px-3 py-2 gap-2 d-flex flex-column">
          <li>
            {/* <AiOutlineWhatsApp size={iconSize} style={{ color: "#128c7e" }} /> */}
            <AiOutlineWhatsApp size={iconSize} />
            <a href="http://wa.me/+40721753515" target="_blank">
              WhatsApp
            </a>
          </li>
          <li>
            {/* <ImMobile size={iconSize} style={{ color: "#3a86ff" }} /> */}
            <ImMobile size={iconSize} />
            <a href="tel:0721753515">0721.753.515</a>
          </li>
          <li>
            {/* <AiOutlineMail size={iconSize} style={{ color: "#430297" }} /> */}
            <AiOutlineMail size={iconSize} />
            <a href="mailto:alin_ngt@yahoo.com">alin_ngt@yahoo.com</a>
          </li>
          <li>
            {/* <AiOutlineInstagram size={iconSize} style={{ color: "#bc2a8d" }} /> */}
            <AiOutlineInstagram size={iconSize} />
            <a href="https://www.instagram.com/alin_ngt" target="_blank">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
