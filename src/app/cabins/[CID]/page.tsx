import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Image from "next/image";
import { Suspense } from "react";
import { HiEyeSlash, HiMapPin, HiUsers } from "react-icons/hi2";

// PLACEHOLDER DATA

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({ CID: String(cabin.id) }));
}
export default async function Page(props: any) {
  const { params } = props;
  //
  const { CID } = params;
  const cabin = await getCabin(CID);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid md:grid-cols-[4fr_4fr] grid-cols-[30rem_1fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-100 -translate-x-3">
          <Image
            fill
            className="object-contain md:object-cover w-full"
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <HiUsers className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiMapPin className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiEyeSlash className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve cabin {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
