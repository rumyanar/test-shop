import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pages } from "../lib.ts";

export const FooterNav = () => {
  return (
    <div className="dock border-t md:hidden">
      {pages.map((linkItem) => {
        return (
          <Link
            key={linkItem.title}
            to={linkItem.link}
            className="flex flex-col items-center grow basis-0"
          >
            <FontAwesomeIcon icon={linkItem.icon} />
            <span className={"text-sm md:text-base"}>{linkItem.title}</span>
          </Link>
        );
      })}
    </div>
  );
};
