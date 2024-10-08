import Link from "next/link";
import React from "react";
import { IconBase } from "react-icons";

export const metadata = {
  title: "Noble Suites | Not Found",
  description: "Page not found",
  keywords: "not found, 404, error",
  icons: {
    icon: "./icon.png"
  }
  // Set the status code to 404 to indicate that the page does not exist
};
export default function notFound() {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">This page doesn&apos;t exist</p>

      <Link
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        href={"/cabins"}
      >
        Browse our luxury cabins
      </Link>
    </main>
  );
}
