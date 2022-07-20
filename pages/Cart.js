import React, { useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { RadioGroup, Radio, FormControlLabel, Button } from "@material-ui/core";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const [pick, setPick] = useState("ramburs");
  const noOfItems = cart.line_items;

  if (!cart.line_items) return <h4 className='text-white fs-6 font-monospace'>Loading...</h4>;

  return (
    <div
      className={
        styles.cart__container +
        " m-0 p-0 py-5 py-md-0 my-5 my-md-0 w-100 d-flex justify-content-center align-items-center"
      }
    >
      <div className={styles.cart__wrapper + " text-center"}>
        <div className={styles.cart__contentUp}>
          {noOfItems
            ? noOfItems.map((item) => (
                <div key={item.id}>
                  <CartItem
                    item={item}
                    onUpdateCartQty={onUpdateCartQty}
                    onRemoveFromCart={onRemoveFromCart}
                  />
                </div>
              ))
            : ""}
        </div>

        <div className={styles.cart__contentDown + " m-0 p-0 py-2"}>
          {cart.line_items.length ? (
            <>
              <h4>
                Subtotal: {cart.subtotal && cart.subtotal.formatted_with_code}
              </h4>
              <div className={styles.cart__pickPayment}>
                <RadioGroup
                  row
                  aria-label="Plata"
                  defaultValue="ramburs"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="ramburs"
                    control={
                      <Radio
                        // color="primary"
                        onClick={() => setPick("ramburs")}
                        style={{ color: "var(--color-primary-light)" }}
                      />
                    }
                    label="Ramburs"
                  />
                  <FormControlLabel
                    value="card"
                    control={
                      <Radio
                        color="primary"
                        onClick={() => setPick("card")}
                        style={{ color: "var(--color-primary-light)" }}
                      />
                    }
                    label="Card"
                  />
                </RadioGroup>
              </div>

              <div className={styles.cart__buttons}>
                <Button
                  variant="outlined"
                  onClick={() => onEmptyCart()}
                  className={styles.cart__emptyCart}
                >
                  Goleste cosul
                </Button>

                {pick === "card" ? (
                  <Link href="/Checkout">
                    <Button variant="contained" className={styles.cart__next}>
                      Plateste
                    </Button>
                  </Link>
                ) : (
                  <Link href="/Ramburs">
                    <Button variant="contained" className={styles.cart__next}>
                      Continua
                    </Button>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className={styles.cart_goToProducts + " p-2"}>
              <h5 className='m-0 p-0'>
                Nu aveti produse in cos.{" "}
                <Link href="/Produse">
                  <a className='px-2'>Aici</a>
                </Link>{" "}
                vedeti produsele noastre.
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
