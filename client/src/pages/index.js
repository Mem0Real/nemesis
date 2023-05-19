import { Inter } from "next/font/google";

import { CategoriesList } from "@/components/CategoriesList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="p-4 bg-slate-500 rounded-3xl">Client</h1>
      <CategoriesList />
    </main>
  );
}
