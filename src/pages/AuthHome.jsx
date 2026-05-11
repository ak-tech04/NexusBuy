import { useEffect, useEffectEvent, useId, useState } from "react";

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
import { Building2, LogIn, LogOut, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

function AuthHome() {
  const [productData, setProductData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [disablePagination, setDisablePagination] = useState(false);
  const [renderHome, setRenderHome] = useState(false);
  let navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    async function getData() {
      let url = `/ecommerce/products?page=${pageCount}&limit=12`;
      let res = await getProductData(url);
      setProductData(res.data.products);
      setTotalPages(res.data.totalPages);
    }
    getData();
  }, [pageCount, renderHome]);

  function nextPage() {
    setPageCount((prev) => prev + 1);
  }

  function prevPage() {
    setPageCount((prev) => (prev > 1 ? prev - 1 : prev));
  }
  function handleSearch(event) {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const searchItem = formData.get("searchItem");
    searchProduct(searchItem);
  }

  async function searchProduct(query) {
    const getAllProducts = await getData();
    console.log(getAllProducts);
    const searchedProduct = await getAllProducts.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    setProductData(searchedProduct);
    setDisablePagination(true);
  }
  async function getData() {
    let url = `/ecommerce/products?limit=1000`;
    let res = await getProductData(url);
    return res.data;
  }

  function goToHome() {
    setRenderHome((prev) => !prev);
    setDisablePagination(false);
  }
  return (
    <div className=" w-full h-dvh   ">
      {/* <Navbar/> */}
      <div className="flex px-4   md:px-16  justify-between h-[8vh] border-1 items-center">
        <Button
          onClick={goToHome}
          variant={"outline"}
          className=" hidden border-none  md:flex md:flex-1  md:justify-start  "
        >
          <Link to="/home">
            {/* logo */}
            <Building2></Building2>
          </Link>
        </Button>

        <SearchComponent onSubmit={handleSearch} />
        <div className="hidden md:flex-1 md:flex md:justify-end md:gap-2">
          {/* right side  */}
          <Link to="/productCart">
            <Button>
              <ShoppingCart />
            </Button>
          </Link>
          <Link to="/profile">
            <Button>
              {auth.username}
              <User />
            </Button>
          </Link>
          <Link to="/">
            <Button
              onClick={async () => {
                await auth.logout();
                navigate("/");
              }}
            >
              <LogOut />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 place-items-center md:grid-cols-4  gap-8 my-16 ">
        {productData.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
      <div className="pb-8">
        {/* pagination */}
        {disablePagination ? null : (
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
        )}
      </div>
    </div>
  );
}

export default AuthHome;
