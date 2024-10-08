import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
import "./_styles/globals.css";
import Header from "./_components/Header";
import ReservationsProvider from "./_components/ReservationsContext";

export const metadata = {
  title: "Noble Suites | Home",
  description:
    "Discover the luxury of Noble Suites, a family-friendly hotel in the heart of Wild Oasis.",
  keywords: "luxury, hotel, noble suites, wilderness, family-friendly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-50 min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <div className="flex-1 flex flex-col">
          <main className="max-w-6xl mx-auto flex-1 flex flex-col w-full">
            <ReservationsProvider>{children}</ReservationsProvider>
          </main>
        </div>
        <footer className="border-t border-primary-900 py-8 text-center z-10">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Noble Suites. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
