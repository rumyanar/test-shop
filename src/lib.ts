import { useEffect } from "react";

export const siteTitle = "Pixel Shop";

export const usePageTitle = ({ section }: { section?: string }): void => {
  const title = section ? `${section} - ${siteTitle}` : siteTitle;
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = siteTitle;
    };
  });
};
