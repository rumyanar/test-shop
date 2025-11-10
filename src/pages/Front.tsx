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
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Shopping"
          />
          <div>
            <h1 className="text-5xl font-bold">Discover Amazing Products</h1>
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
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card my-10 shadow-xl md:mx-auto md:my-12">
        <div className="card-body text-center md:mx-auto md:mb-12">
          <div className="pl-4 text-center lg:text-left">
            {!loggedIn ? (
              <>
                <h1 className="text-2xl font-bold">Login now!</h1>
                <p className="py-6 text-xl">
                  If you already have an account, please log in here.
                </p>
                <div
                  className="card bg-base-100 w-full max-w-md shrink-0 p-4 shadow-2xl"
                  id="login"
                >
                  <LoginForm onSuccess={() => setLoggedIn(true)} />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Login successful</h1>
                <p className="py-6 text-xl">
                  Thank you for logging in. Please feel free to explore the
                  site.
                </p>
                <Link to="/products" className="btn btn-primary">
                  Explore products
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
