import type { ReactNode } from "react";

interface PagePros {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PagePros) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-emerald-900">
        {title}
      </h1>
      {children}
    </div>
  );
};
