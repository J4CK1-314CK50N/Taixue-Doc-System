import React from "react";

const EnginePage: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">      
      <main className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-5xl font-bold tracking-[-0.02em] leading-[1.2] sm:text-6xl">
          This is the 典册 engine page.
        </h1>
        <p className="max-w-[700px] text-center text-lg leading-7">
          See <code className="font-mono text-[#16a34a]">/engine/txd</code> to see the TaixueDoc File definitions, and try with the playground.
        </p>
      </main>
    </div>
  );
};

export default EnginePage;
