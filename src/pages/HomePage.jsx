import  { useEffect, useEffectEvent, useId, useState } from "react";

import SearchComponent from "@/components/SearchComponent";
import ProductCard from "@/components/ProductCard";
import { getProductData } from "@/api/getProductData";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Building2, LogIn, ShoppingCart, User } from "lucide-react";

function HomePage() {
  const [productData, setProductData] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getData() {
      let url = await `/ecommerce/products?page=${pageCount}&limit=12`;
      let res = await getProductData(url);
      setProductData(res.data);
      setTotalPages(res.data.totalPages);
    }
    getData();
  }, [pageCount]);

  function nextPage() {
    setPageCount((prev) => prev + 1);
  }

  function prevPage() {
    setPageCount((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function registerUser() {
    
    
  }
  return (
    <div className=" w-full h-dvh   ">
      {/* <Navbar/> */}
      <div className="flex  px-16 justify-between h-[8vh] border-1 items-center">
        <div className="flex-1 flex ">
          {/* logo */}
          {/* logo */}
          <Building2></Building2>
        </div>

        <SearchComponent />
        <div className="flex-1 flex justify-end gap-2">
          {/* right side  */}
          <Button>
            <ShoppingCart />
          </Button>
          <Button>
            Log in
            <LogIn></LogIn>
          </Button>
          <Button onClick={registerUser}>Sign up 
            <User></User>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 my-16 ">
        {productData.products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
      <div className="pb-8">
        {/* pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={prevPage} href="#" />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (currentCount) => {
                return (
                  <PaginationItem key={currentCount}>
                    <PaginationLink
                      onClick={() => {
                        setPageCount(currentCount);
                      }}
                      href="#"
                      isActive
                    >
                      {currentCount}
                    </PaginationLink>
                  </PaginationItem>
                );
              },
            )}
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={nextPage} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default HomePage;
