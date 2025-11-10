import { useEffect } from "react";

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
