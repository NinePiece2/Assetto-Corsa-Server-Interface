import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Assetto Corssa Server Interface",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="text-gray-400 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M12 14l0 7"></path>
                <path d="M10 12l-6.75 -2"></path>
                <path d="M14 12l6.75 -2"></path>
              </svg>
              <span className="ml-3 text-xl">Assetto Servers</span>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <Link href="/" className="mr-5 header-link">Home</Link>
              <Link href="/Servers" className="mr-5 header-link">Servers</Link>
              <Link href="/Leaderboard" className="mr-5 header-link">Leaderboard</Link>
            </nav>
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Login
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
