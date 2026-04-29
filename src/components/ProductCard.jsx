import React, { useState } from "react";
import Component from "@/components/ui/card";

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
// const handleAddToCart = (product) => {
//   console.log(product);
// };
// const handleToggleWishList = (productId, isWishListed) => {
//   console.log(productId, isWishListed);
// };
function ProductCard({product, handleAddToCart, handleToggleWishList}) {
//   const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <Component
      product={product}
    //   isDark={isDarkMode}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishList}
    />
  );
}

// function handleAddToCart(product) {
//   console.log('product added to cart',product);
// }
// function handleToggleWishList(productId, isWishListed) {
//   console.log("Product id ", productId, "added to wish list ", isWishListed);
// }

export default ProductCard;
