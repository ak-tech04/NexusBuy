import React, { useState } from "react";
import Component from "@/components/ui/ProductCard";
import { useTheme } from "@/contexts/ThemeContext";
import ProductView from "./ProductView";
import { Navigate, useNavigate } from "react-router";

// const product = {
//   id: 1,
//   name: "Wireless Bluetooth Headphones",
//   category: "Electronics",
//   price: 199.99,
//   salePrice: 149.99,
//   image:
//     "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   rating: 4.5,
//   reviews: 128,
//   inStock: true,
// };
// const handleToggleWishList = (productId, isWishListed) => {
//   console.log(productId, isWishListed);
// };
function ProductCard({ product, handleAddToCart, handleToggleWishList }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div onClick={handleProductClick}>
      <Component
        product={product}
        isDark={isDark}
        onAddToCart={handleAddToCart}
        // onToggleWishlist={handleToggleWishList}
      />
    </div>
  );
}

// function handleAddToCart(product) {
//   console.log('product added to cart',product);
// }
// function handleToggleWishList(productId, isWishListed) {
//   console.log("Product id ", productId, "added to wish list ", isWishListed);
// }

export default ProductCard;
