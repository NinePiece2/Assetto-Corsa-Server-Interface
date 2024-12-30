import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-28 pt-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">Assetto Corsa Server Information</h1>

        <section className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">About Assetto Corsa Servers</h2>
          <p className="text-lg mt-2">
            Assetto Corsa is a popular racing simulation game that allows players to connect to dedicated servers for multiplayer racing.
          </p>
        </section>

        <section className="text-center sm:text-left mt-6">
          <h2 className="text-2xl font-semibold">Setting Up Content Manager & CSP</h2>
          <p className="text-lg mt-2">
            Content Manager is a third-party tool that allows you to manage mods, cars, tracks, and server settings for Assetto Corsa. The Custom Shaders Patch (CSP) is a mod that enhances the game’s graphics and adds new features.
          </p>
          <div className="mt-4">
            <ul className="list-inside list-disc text-lg">
              <li>Download and install Content Manager from the official website.</li>
              <li>Install CSP for enhanced visuals and customization.</li>
            </ul>
          </div>
        </section>

        <section className="text-center sm:text-left mt-6">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="mt-4">
            <ul className="list-inside list-disc text-lg">
              <li>Support for custom mods and cars</li>
              <li>Real-time race statistics and leaderboard tracking</li>
              <li>Enhanced graphics and physics with CSP</li>
              <li>Multiplayer race sessions with dynamic weather and time of day</li>
            </ul>
          </div>
        </section>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://assettocorsa.gg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt=""
              width={20}
              height={20}
            />
            Official Assetto Corsa Website
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://www.overtake.gg/downloads/categories/assetto-corsa.1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Mods & Tracks
          </a>
        </div>
      </main>

      
    </div>
  );
}
