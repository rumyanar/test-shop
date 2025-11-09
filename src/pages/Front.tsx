import { usePageTitle } from "../lib.ts";

export const Front = () => {
  usePageTitle({});

  return (
    <div className="card my-10 shadow-xl md:mx-auto md:my-12">
      <div className="card-body text-center md:mx-auto md:mb-12">
        <h1 className="font-heading leading-tighter text-heading text-3xl font-bold tracking-tighter md:text-5xl">
          Welcome
        </h1>
      </div>
    </div>
  );
};
