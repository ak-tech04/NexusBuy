import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({
  product,
  isDark,
  onAddToCart,
  // onToggleWishlist
}) => {
  // const [isWishlisted, setIsWishlisted] = useState(false);

  // const handleWishlistClick = () => {
  //   setIsWishlisted(!isWishlisted);
  //   onToggleWishlist?.(product.id, !isWishlisted);
  // };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  // Theme classes - Using shadcn theme variables
  const cardClasses = isDark
    ? "bg-card text-card-foreground border-border"
    : "bg-background text-foreground border-border";

  const textSecondary = isDark
    ? "text-muted-foreground"
    : "text-muted-foreground";
  const textMuted = isDark ? "text-muted" : "text-muted";
  const buttonPrimary = isDark
    ? "bg-primary hover:bg-primary/90"
    : "bg-primary hover:bg-primary/90";
  const wishlistButton = isDark
    ? "bg-secondary hover:bg-secondary/80"
    : "bg-secondary hover:bg-secondary/80";

  // const outOfStock = "opacity-100 cursor-not-allowed bg-muted";

  return (
    <div
      className={`max-w-sm 
      lg:max-w-lg mx-auto rounded-lg border shadow-lg hover:shadow-xl 
      transition-all duration-300 overflow-hidden group transform hover:scale-[1.02]
      ${cardClasses}
    `}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.mainImage?.url}
          alt={product.mainImage}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        {/* <button
          onClick={handleWishlistClick}
          className={`
            absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 
            ${wishlistButton} ${isWishlisted ? 'text-destructive' : textMuted} 
            hover:scale-110 shadow-lg backdrop-blur-sm
          `}
        >
          <Heart 
            size={20} 
            fill={isWishlisted ? 'currentColor' : 'none'} 
          />
        </button> */}

        {/* Sale Badge */}
        {/* {product.salePrice && (
          <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
          </div>
        )} */}

        {/* Stock Badge */}
        {product.stock == 0 && (
          <div className="absolute inset-0 opacity-50  flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <p
          className={`text-xs uppercase tracking-wider font-semibold mb-2 ${textMuted}`}
        >
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-bold text-xl mb-3 leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {/* <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-current"
                    : textMuted
                }`}
              />
            ))}
          </div>
          <span className={`text-sm font-medium ${textSecondary}`}>
            {product.rating} ({product.reviews} reviews)
          </span>
        </div> */}

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline space-x-2">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold text-destructive">
                  ${product.salePrice}
                </span>
                <span className={`text-lg line-through ${textMuted}`}>
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </div>

          {product.stock > 0 && (
            <span className="text-sm text-accent-foreground font-semibold bg-accent px-2 py-1 rounded-full">
              ✓ In Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock == 0}
          className={`
            w-full py-3.5 px-6 rounded-lg font-semibold transition-all duration-200 
            flex items-center justify-center space-x-2 text-primary-foreground
            ${product.stock > 0 ? `${buttonPrimary} ` : ` bg-primary  cursor-not-allowed `}
          `}
        >
          <ShoppingCart size={20} />
          <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
        </button>
      </div>
    </div>
  );
};

// const App = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Sample product
//   const product = {
//     id: 1,
//     name: "Wireless Bluetooth Headphones",
//     category: "Electronics",
//     price: 199.99,
//     salePrice: 149.99,
//     image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     rating: 4.5,
//     reviews: 128,
//     inStock: true
//   };

//   const handleAddToCart = (product) => {
//     alert(`${product.name} added to cart!`);
//   };

//   const handleToggleWishlist = (productId, isWishlisted) => {
//     alert(`Product ${isWishlisted ? 'added to' : 'removed from'} wishlist!`);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`w-full min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-background' : 'bg-background'
//     }`}>
//       {/* Header with Dark Mode Toggle
//       <div className={`sticky top-0 z-10 backdrop-blur-md transition-colors duration-300 ${
//         isDarkMode ? 'bg-card/90 text-card-foreground border-border' : 'bg-card/90 text-card-foreground border-border'
//       } border-b`}>
//         <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">ShopMart</h1>
//             <p className={`text-sm ${isDarkMode ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
//               Premium Products
//             </p>
//           </div>

//           <button
//             onClick={toggleDarkMode}
//             className={`p-3 rounded-full transition-all duration-200 ${
//               isDarkMode
//                 ? 'bg-secondary hover:bg-secondary/80 text-accent'
//                 : 'bg-secondary hover:bg-secondary/80 text-accent'
//             } hover:scale-110`}
//           >
//             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}  const [isDarkMode, setIsDarkMode] = useState(false);

//           </button>
//         </div>
//       </div> */}

//       {/* Product Card Container */}
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <div className="flex justify-center">
//           <ProductCard
//             product={product}
//             isDark={isDarkMode}
//             onAddToCart={handleAddToCart}
//             onToggleWishlist={handleToggleWishlist}
//           />
//         </div>

//         {/* Demo Info */}
//         {/* <div className={`mt-12 text-center ${
//           isDarkMode ? 'text-muted-foreground' : 'text-muted-foreground'
//         }`}>
//           <p className="text-sm">
//             Toggle the theme and try the wishlist & cart buttons!
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

export default ProductCard;
