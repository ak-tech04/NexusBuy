import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductView = ({ product, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Combine main image with sub images for carousel
  const allImages = [
    product.mainImage,
    ...(product.subImages || []),
  ];

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product._id)
    // Add your cart logic here

  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const isOutOfStock = product.stock === 0;
  const stockPercentage = (product.stock / 100) * 100;

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Carousel Section */}
          <div className="flex flex-col gap-6">
            {/* Main Image Carousel */}
            <div className="relative bg-card rounded-lg overflow-hidden border border-border aspect-square">
              <img
                src={allImages[currentImageIndex].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-destructive text-destructive-foreground px-6 py-3 rounded-full font-bold text-lg">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm text-card-foreground px-3 py-1.5 rounded-full text-sm font-medium border border-border">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={image._id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-8">
            {/* Product Header */}
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
                {product.name}
              </h1>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-40 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm mb-2">Price</p>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <div className="bg-secondary/10 border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-card-foreground">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground text-sm mb-2">Category</p>
                <p className="font-semibold text-card-foreground">
                  {product.category}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground text-sm mb-2">Stock Status</p>
                <p
                  className={`font-semibold ${
                    isOutOfStock
                      ? "text-destructive"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "In Stock"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-6 text-lg font-semibold"
                size="lg"
              >
                <ShoppingCart size={20} className="mr-2" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button
                onClick={handleToggleWishlist}
                variant="outline"
                size="lg"
                className="px-6 py-6"
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                  className={isWishlisted ? "text-destructive" : ""}
                />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">
                ✓ Free shipping on orders over $50
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                ✓ 30-day return guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;