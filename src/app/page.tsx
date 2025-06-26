'use client';

import Image from "next/image";
import DeploymentTable from "./components/deployment";
import Selector from "./components/selector";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState<{
    system: string;
    repos: string[];
    environment: string;
  }>({
    system: '',
    repos: [],
    environment: '',
  });

  const handleSelectionChange = (selections: {
    system: string;
    repos: string[];
    environment: string;
  }) => {
    setFilters(selections);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <h1 className="text-2xl font-bold mb-4">Deployment Manager</h1>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="w-full max-w-5xl">
              <Selector onSelectionChange={handleSelectionChange} />
            </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="w-full max-w-5xl">
              <DeploymentTable repos={filters.repos} environment={filters.environment} />
            </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
       
      </footer>
    </div>
  );
}
