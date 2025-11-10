import {
  faHouse,
  faList,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

type linkType = { title: string; link: string; icon: IconDefinition };
const pages: linkType[] = [
  { title: "Home", link: "/", icon: faHouse },
  { title: "Products", link: "/products", icon: faList },
];

export const Sidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <div className="is-drawer-close:w-14 is-drawer-open:w-fit md:is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
        {/* Sidebar content here */}

        <Link to="/" className="  w-full mt-3 pl-2">
          <img src="/img/logo.png" alt="logo" className="h-10" />
        </Link>
        <ul className="menu w-full grow mt-5">
          {pages.map((linkItem) => {
            return (
              <li key={linkItem.title}>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right [&.active]:bg-base-300"
                  data-tip={linkItem.title}
                  to={linkItem.link}
                >
                  <FontAwesomeIcon icon={linkItem.icon} />
                  <span className="is-drawer-close:hidden">
                    {linkItem.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* button to open/close drawer */}
        <div
          className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Open"
        >
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-4 my-1.5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};
