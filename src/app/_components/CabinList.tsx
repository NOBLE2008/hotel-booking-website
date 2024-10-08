import React from "react";
import { getBookedDatesByCabinId, getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter = "" }) {
  const cabins: Array<any> = (await getCabins()) ?? [];

  let displayedData: Array<any> = [];
  if (filter === "all" || !filter) displayedData = cabins;
  if (filter === "1-3")
    displayedData = cabins.filter((cabin) => {
      return cabin.maxCapacity <= 3;
    });
  if (filter === "4-7")
    displayedData = cabins.filter((cabin) => {
      return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
    });
  if (filter === "8-12")
    displayedData = cabins.filter((cabin) => {
      return cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12;
    });
  if (filter === ">12")
    displayedData = cabins.filter((cabin) => {
      return cabin.maxCapacity > 12;
    });
    getBookedDatesByCabinId('171')
  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8 lg:gap-12 xl:gap-14">
          {displayedData.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}
