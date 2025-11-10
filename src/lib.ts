import { useEffect } from "react";
import {
  faHouse,
  faList,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const siteTitle = "Pixel Shop";

export const extractTitle = () => {
  return document.title.split(" - ")[0];
};

export const usePageTitle = ({ section }: { section?: string }) => {
  const title = section ? `${section} - ${siteTitle}` : siteTitle;
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = siteTitle;
    };
  });
};

type linkType = { title: string; link: string; icon: IconDefinition };
export const pages: linkType[] = [
  { title: "Home", link: "/", icon: faHouse },
  { title: "Products", link: "/products", icon: faList },
];
