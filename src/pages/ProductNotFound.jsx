import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductNotFound() {
	const navigate = useNavigate();

	function handleGoHome() {
		navigate("/home");
	}

	function handleGoBack() {
		navigate(-1);
	}

	return (
		<div className="min-h-screen bg-background px-4 py-10 text-foreground">
			<div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
				<Card className="w-full max-w-xl border-border bg-card text-card-foreground shadow-lg">
					<CardHeader className="space-y-4 text-center">
						<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
							<span className="text-3xl font-bold">404</span>
						</div>

						<CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
							Product Not Found
						</CardTitle>

						<CardDescription className="text-base text-muted-foreground sm:text-lg">
							The product you’re looking for doesn’t exist, was removed, or the
							link is incorrect.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
							{/* <Button
								type="button"
								onClick={handleGoHome}
								className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
							>
								<Home className="h-4 w-4" />
								Go to Home
							</Button> */}

							<Button
								type="button"
								variant="outline"
								onClick={handleGoBack}
								className="gap-2 border-border bg-background text-foreground hover:bg-secondary"
							>
								<ArrowLeft className="h-4 w-4" />
								Go Back
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
