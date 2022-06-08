import ScrollToTop from "../components/ScrollToTop";
import { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import Head from "next/head";
import GlobalStyle from "./globalStyles";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
    console.log("Added to cart: ", productId, quantity);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
    console.log("Update quantity:", productId, quantity);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
    console.log("Remove from cart: ", productId);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
    console.log("Cart is empty now!");
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
    console.log("New cart added!");
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
      <SessionProvider session={session}>
        <GlobalStyle />
        <Head>
          <title>Online Glasses Store</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <Layout totalItems={cart.total_items === 0 ? null : cart.total_items}>
          <Component
            {...pageProps}
            onAddToCart={handleAddToCart}
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onEmptyCart={handleEmptyCart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />

          <ScrollToTop />
        </Layout>
      </SessionProvider>
  );
}

export default MyApp;
