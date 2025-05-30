import type { ReactNode } from "react";

interface PagePros {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PagePros) => {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold text-emerald-900">
        {title}
      </h1>
      {children}
    </>
  );
};
