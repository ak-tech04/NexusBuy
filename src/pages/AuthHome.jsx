import { useEffect, useEffectEvent, useId, useState } from "react";

import SearchComponent from "@/components/SearchComponent";
import ProductCard from "@/components/ProductCard";
import { getProductData as fetchProductData } from "@/api/getProductData";

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
import {
  Building2,
  LogIn,
  LogOut,
  Moon,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";

function AuthHome() {
  const { theme, isDark, toggleTheme } = useTheme();

  const [availableProducts, setAvailableProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [isPaginationActive, setIsPaginationActive] = useState(false);
  const [renderHome, setRenderHome] = useState(false);
  let navigate = useNavigate();
 const productCart = useCart();
  const auth = useAuth();

  useEffect(() => {
    async function loadProducts() {
      let url = `/ecommerce/products?page=${currentPage}&limit=12`;
      let res = await fetchProductData(url);
      setAvailableProducts(res.data.products);
      setTotalPageCount(res.data.totalPages);
    }
    loadProducts();
  }, [currentPage, renderHome]);

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  function prevPage() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }
  function handleSearch(event) {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const searchQuery = formData.get("searchItem");
    searchProduct(searchQuery);
  }

  async function searchProduct(query) {
    const getAllProducts = await fetchProducts();
    console.log(getAllProducts);
    const matchingProducts = await getAllProducts.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    setAvailableProducts(matchingProducts);
    setIsPaginationActive(true);
  }
  async function fetchProducts() {
    let url = `/ecommerce/products?limit=10000`;
    let res = await fetchProductData(url);
    return res.data;
  }

  function goToHome() {
    setRenderHome((prev) => !prev);
    setIsPaginationActive(false);
  }

  function viewProduct(product) {
    console.log(product);
  }
  function handleAddToCart(productId) {
    productCart.addProductToCart(productId);
  }
  return (
    <div className=" w-full h-dvh   ">
      {/* <Navbar/> */}
      <div className="flex px-4   md:px-16  justify-between h-[8vh] border-1 items-center">
        <Link
          to="/home"
          onClick={goToHome}
          className=" hidden md:flex-1 md:flex "
        >
          {/* logo */}
          <Building2></Building2>
        </Link>

        <SearchComponent onSubmit={handleSearch} />
        <div className="hidden md:flex-1 md:flex md:justify-end md:gap-1">
          {/* right side  */}
          <Link to="/shoppingCart">
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
          <Button className="border" onClick={toggleTheme}>
            {theme == "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 place-items-center md:grid-cols-4  gap-8 my-16 ">
        {availableProducts.map((product) => {
          return <ProductCard key={product._id} product={product} addToCart={handleAddToCart} />;
        })}
      </div>
      <div className="pb-8">
        {/* pagination */}
        {isPaginationActive ? null : (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} href="#" />
              </PaginationItem>
              {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(
                (currentCount) => {
                  return (
                    <PaginationItem key={currentCount}>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(currentCount);
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
