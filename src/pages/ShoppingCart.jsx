import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductData } from "@/api/getProductData";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ShoppingCart() {
	const navigate = useNavigate();
	const { cartProductIds, removeProductFromCart, clearCart } = useCart();

	const [cartProducts, setCartProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [quantities, setQuantities] = useState({});
	const [error, setError] = useState(null);

	// ✅ On mount: fetch cart products
	useEffect(() => {
		const fetchCartProducts = async () => {
			try {
				setLoading(true);
				setError(null);

				if (cartProductIds.length === 0) {
					setCartProducts([]);
					setLoading(false);
					return;
				}

				// ✅ Fetch each product by ID
				const products = await Promise.all(
					cartProductIds.map(async (productId) => {
						const url = `/ecommerce/products/${productId}`;
						const response = await getProductData(url);
						if (response.success && response.data) {
							return response.data;
						}
						return null;
					})
				);

				// Filter out failed fetches
				const validProducts = products.filter((p) => p !== null);
				setCartProducts(validProducts);

				// Initialize quantities
				const initialQuantities = {};
				validProducts.forEach((product) => {
					initialQuantities[product._id] = 1;
				});
				setQuantities(initialQuantities);
			} catch (error) {
				console.error("Error fetching cart products:", error);
				setError("Failed to load cart items");
			} finally {
				setLoading(false);
			}
		};

		fetchCartProducts();
	}, [cartProductIds]);

	// ✅ Calculate total price
	const totalPrice = cartProducts.reduce((sum, product) => {
		return sum + product.price * (quantities[product._id] || 1);
	}, 0);

	// ✅ Increase quantity
	const increaseQuantity = (productId) => {
		setQuantities((prev) => ({
			...prev,
			[productId]: (prev[productId] || 1) + 1,
		}));
	};

	// ✅ Decrease quantity
	const decreaseQuantity = (productId) => {
		setQuantities((prev) => ({
			...prev,
			[productId]: Math.max(1, (prev[productId] || 1) - 1),
		}));
	};

	// ✅ Remove product from cart
	const handleRemoveProduct = (productId) => {
		removeProductFromCart(productId);
		setCartProducts((prev) => prev.filter((p) => p._id !== productId));
	};

	// ✅ Handle checkout
	const handleCheckout = () => {
		console.log("Proceeding to checkout with items:", cartProducts);
        
		// alert("Checkout functionality coming soon!");
		// TODO: Implement checkout flow
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center space-y-4">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
					<p className="text-foreground text-lg">Loading your cart...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background p-4">
				<div className="max-w-4xl mx-auto">
					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle className="text-destructive">{error}</CardTitle>
						</CardHeader>
						<CardContent>
							<Button
								onClick={() => navigate("/home")}
								className="bg-primary hover:bg-primary/90 text-primary-foreground"
							>
								Continue Shopping
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (cartProducts.length === 0) {
		return (
			<div className="min-h-screen bg-background p-4 md:p-8">
				<div className="max-w-4xl mx-auto">
					<Card className="bg-card border-border">
						<CardHeader className="text-center space-y-4">
							<ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
							<CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
							<CardDescription className="text-base">
								Add some products to get started!
							</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-center">
							<Button
								onClick={() => navigate("/home")}
								className="bg-primary hover:bg-primary/90 text-primary-foreground"
							>
								Continue Shopping
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
						<ShoppingBag className="w-10 h-10 text-primary" />
						Shopping Cart
					</h1>
					<p className="text-muted-foreground">
						{cartProducts.length} item
						{cartProducts.length !== 1 ? "s" : ""} in your cart
					</p>
				</div>

				<Separator className="bg-border" />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Products List */}
					<div className="lg:col-span-2 space-y-4">
						{cartProducts.map((product) => (
							<Card
								key={product._id}
								className="bg-card border-border hover:shadow-lg transition-shadow"
							>
								<CardContent className="p-4 md:p-6">
									<div className="flex gap-4 md:gap-6">
										{/* Product Image */}
										{product.mainImage?.url && (
											<div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary">
												<img
													src={product.mainImage.url}
													alt={product.name}
													className="w-full h-full object-cover hover:scale-110 transition-transform"
												/>
											</div>
										)}

										{/* Product Details */}
										<div className="flex-1 space-y-2">
											<h3 className="text-lg md:text-xl font-semibold text-foreground">
												{product.name}
											</h3>
											<p className="text-sm text-muted-foreground line-clamp-2">
												{product.description}
											</p>
											<p className="text-2xl font-bold text-primary">
												${product.price}
											</p>

											{/* Quantity Controls */}
											<div className="flex items-center gap-3 pt-2">
												<span className="text-sm text-muted-foreground">
													Qty:
												</span>
												<div className="flex items-center border border-border rounded-lg bg-secondary">
													<button
														onClick={() => decreaseQuantity(product._id)}
														className="p-1.5 hover:bg-primary/10 transition-colors"
													>
														<Minus className="w-4 h-4" />
													</button>
													<span className="px-3 text-center w-12">
														{quantities[product._id] || 1}
													</span>
													<button
														onClick={() => increaseQuantity(product._id)}
														className="p-1.5 hover:bg-primary/10 transition-colors"
													>
														<Plus className="w-4 h-4" />
													</button>
												</div>
											</div>
										</div>

										{/* Remove Button */}
										<div className="flex flex-col justify-between items-end">
											<p className="text-sm text-muted-foreground">
												Subtotal:
											</p>
											<p className="text-lg font-bold text-foreground">
												$(
													(product.price * (quantities[product._id] || 1))
														.toFixed(2)
												)
											</p>
											<Button
												variant="destructive"
												size="sm"
												onClick={() => handleRemoveProduct(product._id)}
												className="mt-auto"
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Cart Summary */}
					<div className="lg:col-span-1">
						<Card className="bg-card border-border sticky top-4">
							<CardHeader>
								<CardTitle className="text-foreground">
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Summary Details */}
								<div className="space-y-3 text-sm">
									<div className="flex justify-between text-muted-foreground">
										<span>Subtotal</span>
										<span>${totalPrice.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-muted-foreground">
										<span>Shipping</span>
										<span>$0.00</span>
									</div>
									<div className="flex justify-between text-muted-foreground">
										<span>Tax</span>
										<span>$0.00</span>
									</div>
								</div>

								<Separator className="bg-border" />

								<div className="flex justify-between font-bold text-lg">
									<span className="text-foreground">Total:</span>
									<span className="text-primary">
										${totalPrice.toFixed(2)}
									</span>
								</div>

								{/* Buttons */}
								<div className="space-y-3 pt-4">
									<Button
										onClick={handleCheckout}
										className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
									>
										Buy Now
									</Button>
									<Button
										variant="outline"
										onClick={() => navigate("/home")}
										className="w-full border-border text-foreground hover:bg-secondary"
									>
										Continue Shopping
									</Button>
									<Button
										variant="ghost"
										onClick={clearCart}
										className="w-full text-destructive hover:bg-destructive/10"
									>
										Clear Cart
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
