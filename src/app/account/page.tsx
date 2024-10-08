import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Noble Suites | Account",
};
export default async function Page() {
  // @ts-ignore
  const session: {
    user: { name: string; email: string; image: string };
    expires: string;
  } = await auth();

  return (
    <>
      <h1 className="text-accent-400 text-2xl mb-3">
        Welcome {session?.user?.name.split(" ")[0]},
      </h1>
      <h2 className="text-xl">Edit account info here.</h2>
    </>
  );
}
