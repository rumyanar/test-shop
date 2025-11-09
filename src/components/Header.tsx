import { Link } from "@tanstack/react-router";

const btnClasses = " btn btn-ghost [&.active]:bg-base-300";
type linkType = { title: string; link: string };
const pages: linkType[] = [
  { title: "Home", link: "/" },
  { title: "Products", link: "/products" },
];

export const Header = () => {
  return (
    <header className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start space-x-4">
        <Link to="/" className="btn btn-ghost btn-square">
          <img src="/img/logo.png" alt="logo" className="h-10 w-10" />
        </Link>

        {pages.map((linkItem) => {
          return (
            <Link
              key={linkItem.title}
              to={linkItem.link}
              className={btnClasses}
            >
              {linkItem.title}
            </Link>
          );
        })}
      </div>
    </header>
  );
};
