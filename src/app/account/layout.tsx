import React from "react";
import SideNavigation from "../_components/SideNavigation";
import { getCabins } from "../_lib/data-service";

export default async function Layout(props: any) {
  const { children } = props;
  await getCabins();
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12 flex-1">
      <SideNavigation />
      <div className="p-4">{children}</div>
    </div>
  );
}
