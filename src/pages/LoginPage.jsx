import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Link, redirect, useNavigate } from "react-router";
import { useState } from "react";
// import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [validationError, setValidationError] = useState(""); // ✅ Form validation (passwords match, etc)
  const [apiError, setApiError] = useState(""); // ✅ API/Network errors
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success/API response message

  const navigate = useNavigate();
  const auth = useAuth();
  // const context = useAuthContext();
  function handleSubmit(event) {
    event.preventDefault();
    setValidationError(""); // Clear previous errors
    setApiError("");
    setSuccessMessage("");

    const username = event.target.userName.value;
    const password = event.target.password.value;

    submitForm(username, password);
  }

  async function submitForm(username, password) {
    setApiError("");
    setSuccessMessage("");

    const body = JSON.stringify({
      username,
      password,
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body,
      credentials: "include",
    };

    const url = import.meta.env.VITE_API_URL + "/users/login";

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // API returned an error (400, 401, 409, 500, etc)
        setApiError(data.message || "Login failed");
        return;
      }

      // Success
      setSuccessMessage(data.message || "Login successful!");
      auth.login(data?.data?.user);

      navigate("/home");
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
          <Link to="/" href="#" className="flex items-center gap-2 font-medium">
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
            <LoginForm onSubmit={handleSubmit} />
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
