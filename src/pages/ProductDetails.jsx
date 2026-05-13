import React from "react";
import { useParams } from "react-router";

function ProductDetails({ id }) {
  const params = useParams();
  console.log(params)
  return <div>{params.productId}</div>;
}

export default ProductDetails;
