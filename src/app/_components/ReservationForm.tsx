"use client";
import Image from "next/image";
import { useReservations } from "./ReservationsContext";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/action";
import ReservationFormButton from "./ReservationFormButton";

function ReservationForm(props: any) {
  // CHANGE
  const { cabin, user } = props;
  const { maxCapacity, regularPrice, discount } = cabin;
  const reservationsContext: any = useReservations();
  const { range } = reservationsContext;

  const { from: startDate, to: endDate } = range;
  const numNights = differenceInDays(startDate, endDate);
  const cabinPrice = (regularPrice - discount) * Math.abs(numNights);

  const additionalData = {
    cabinId: cabin.id,
    startDate,
    endDate,
    numNights: Math.abs(numNights),
    totalPrice: cabinPrice,
  };

  const createReservationWithData = createReservation.bind(
    null,
    additionalData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <div className="relative aspect-square w-8">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full object-cover"
              src={user?.image}
              alt={user?.name}
              fill
            />
          </div>
          <p>{user?.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={createReservationWithData}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          <ReservationFormButton />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
