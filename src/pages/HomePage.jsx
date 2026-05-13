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
import { Building2, LogIn, Moon, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

function HomePage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [productData, setProductData] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    // Context updating is Async process => Take localStorage
    const authenticated = JSON.parse(localStorage.getItem("isAuth"));
    // console.log(authenticated);

    try {
      if (authenticated) {
        navigate("/home");
        return;
      } else {
        throw Error("No auth token");
      }
    } catch (error) {
      navigate("/");
      return;
    }
  }, []);
  useEffect(() => {
    async function getData() {
      let url = `/ecommerce/products?page=${pageCount}&limit=12`;
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

  // function registerUser() {}

  return (
    <div className=" w-full h-dvh   ">
      {/* <Navbar/> */}
      <div className="flex px-4   md:px-16  justify-between h-[8vh] border-1 items-center">
        <Link to="/" className=" hidden md:flex-1 md:flex ">
          {/* logo */}
          <Building2></Building2>
        </Link>

        <SearchComponent />
        <div className="hidden md:flex-1 md:flex md:justify-end md:gap-2">
          {/* right side  */}
          {/* <Button>
            <ShoppingCart />
          </Button> */}
          <Link to="/home">
            <Button>
              Log in
              <LogIn />
            </Button>
          </Link>
          <Link to="/signup">
            <Button>
              Sign up
              <User />
            </Button>
          </Link>
          {/* <AnimatedThemeToggler onClick={toggleTheme} variant="square" /> */}
          <Button className="border" onClick={toggleTheme}>
            {theme == "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 place-items-center md:grid-cols-4  gap-8 my-16 ">
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
