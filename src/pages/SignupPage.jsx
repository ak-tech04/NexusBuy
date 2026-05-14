import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { Link } from "react-router";
import { useState } from "react";

export default function SignupPage() {
  const [validationError, setValidationError] = useState(""); 
  const [apiError, setApiError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  function handleSubmit(event) {
    event.preventDefault();
    setValidationError(""); // Clear previous errors
    setApiError("");
    setSuccessMessage("");

    const userName = event.target.userName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Validation checks
    if (!userName || !email || !password || !confirmPassword) {
      setValidationError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    submitForm(userName, email, password);
  }

  async function submitForm(userName, email, password) {
    setApiError("");
    setSuccessMessage("");

    const role = "ADMIN";
    const body = JSON.stringify({
      email,
      password,
      role,
      username: userName,
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body,
    };

    const url = import.meta.env.VITE_API_URL + "/users/register";

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // API returned an error (400, 401, 409, 500, etc)
        setApiError(data.message || "Registration failed");
        return;
      }

      // Success
      setSuccessMessage(data.message || "Registration successful!");
    } catch (error) {
      // Network error or JSON parse error
      console.error("Error:", error);
      setApiError("Network error: " + error.message);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NexusBuy
          </Link>
        </div>

        {/* Display messages with appropriate styling */}
        {validationError && (
          <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
            {validationError}
          </div>
        )}
        {apiError && (
          <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
            {successMessage}
          </div>
        )}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
