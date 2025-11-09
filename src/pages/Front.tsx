import { siteTitle, usePageTitle } from "../lib.ts";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm.tsx";

export const Front = () => {
  usePageTitle({});
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(loggedIn);
  return (
    <>
      <div className="card my-10 shadow-xl md:mx-auto md:my-12">
        <div className="card-body text-center md:mx-auto md:mb-12">
          <h1 className="font-heading leading-tighter text-heading text-3xl font-bold tracking-tighter md:text-5xl">
            Welcome to {siteTitle}
          </h1>
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
