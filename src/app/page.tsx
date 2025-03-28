import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="">
          <h1 className="text-center text-5xl font-bold sm:text-6xl">
            Taixue Doc SYSTEM.
          </h1>
          <p className="text-center text-lg m-6">
            See <code className="font-mono text-[#16a34a]">
              <Link href="../engine/txd">
                /engine/txd
              </Link>
            </code> to use and explore txd file in the playground.
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Notice: This is a WIP project.
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Made with 💗 by Jacky_Blackson.
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Still WIP... →
        </span>
      </footer>
    </div>
  );
}
