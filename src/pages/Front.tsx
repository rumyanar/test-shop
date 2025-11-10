import { siteTitle, usePageTitle } from "../lib.ts";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm.tsx";

export const Front = () => {
  usePageTitle({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary/5 to-primary/20 min-h-[500px]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 max-w-7xl">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            className="max-w-sm max-sm:w-full rounded-lg shadow-2xl"
            alt="Shopping"
          />
          <div>
            <h1 className="text-5xl max-sm:text-4xl font-bold">
              Discover Amazing Products
            </h1>
            <p className="py-6 text-lg">
              Welcome to {siteTitle}! Explore our curated collection of premium
              products at unbeatable prices. From electronics to fashion, find
              everything you need in one place. Start shopping today and
              experience the difference.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="card lg:card-side max-lg:flex-col-reverse bg-base-100 shadow-md mb-6">
          {!loggedIn ? (
            <>
              <div className="max-w-md mx-auto w-full p-6" id="login">
                <LoginForm onSuccess={() => setLoggedIn(true)} />
              </div>
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Login now!</h2>
                <p className="text-base mb-6">
                  If you already have an account, please log in here. Access
                  your personalized dashboard and manage your orders.
                </p>
              </div>
            </>
          ) : (
            <div className="card-body text-center py-8">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="card-title text-2xl justify-center mb-4">
                Login successful!
              </h2>
              <p className="text-base mb-6">
                Thank you for logging in. Please feel free to explore the site
                and discover our amazing collection of products.
              </p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
