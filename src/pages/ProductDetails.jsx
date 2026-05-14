import ProductView from "@/components/ProductView";
import { useCart } from "@/contexts/CartContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ProductDetails() {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [productLoading, setProductLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);
  const navigate = useNavigate();
  const productCart = useCart();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const productId = params.productId;
        const url = `${import.meta.env.VITE_API_URL}/ecommerce/products/${productId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log(response);

        if (response.status === 200) {
          setProductDetails(data.data);
        } else if (response.status === 404) {
          setProductNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProductById();
  }, []);
  function handleAddToCart(productId) {
    productCart.addProductToCart(productId);
  }
  if (productLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading Product...</span>
      </div>
    );
  }

  if (productNotFound) {
    return navigate("/product-not-found");
  }
  return (
    <div>
      <ProductView product={productDetails} addToCart={handleAddToCart} />
    </div>
  );
}

export default ProductDetails;
