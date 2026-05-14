import { useContext, createContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw Error("Empty Cart context");
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cartProductIds") === null) {
      return;
    }
    setCartProductIds(JSON.parse(localStorage.getItem("cartProductIds")));
  }, []);

  const addProductToCart = (productId) => {
    setCartProductIds((prev) => {
      if (prev.includes(productId)) {
        console.log("product already exist");
        return prev;
      }
      const updated = [...prev, productId];
      localStorage.setItem("cartProductIds", JSON.stringify(updated));
      return updated;
    });
  };

  const removeProductFromCart = (productId) => {
    setCartProductIds((prev) => {
      const updated = prev.filter((id) => id !== productId);
      localStorage.setItem("cartProductIds", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartProductIds([]);
    localStorage.removeItem("cartProductIds");
  };

  const productCart = {
    cartProductIds,
    addProductToCart,
    removeProductFromCart,
    clearCart,
  };
  return (
    <CartContext.Provider value={productCart}>{children}</CartContext.Provider>
  );
};
