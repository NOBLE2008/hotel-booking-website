"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  const activeFilter = searchParams.get("capacity") ?? "all";
  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter("all");
        }}
      >
        All Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "1-3" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter("1-3");
        }}
      >
        1&mdash;3 guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "4-7" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter("4-7");
        }}
      >
        4&mdash;7 guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "8-12" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter("8-12");
        }}
      >
        8&mdash;12 guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === ">12" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter(">12");
        }}
      >
        &gt;12 guests
      </button>
    </div>
  );
}
