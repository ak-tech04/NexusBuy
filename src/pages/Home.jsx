import React from "react";

import SearchComponent from "@/components/SearchComponent";
import ProductCard from "@/components/ProductCard";

// import { getProductData } from "@/api/getProductData";
import Navbar from "@/components/Navbar";
// async function getProduct() {
//   const data = await getProductData();
//   // const product = data?.data?.product;
//   console.log(data);
//   // console.log(product);
// }

const url = import.meta.env.VITE_API_URL;
console.log(url);



function Home() {
  // getProductData();
  return (
    <div className=" w-full h-dvh  ">
      {/* <Navbar/> */}

      <SearchComponent />
      {/* {url} */}
      {/* <ProductCard/> */}
      {/* <ProductCard/> */}

      {/* <PageNav /> */}
    </div>
  );
}

export default Home;
