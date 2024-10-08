import UpdateReservationFormButton from "@/app/_components/UpdateReservationFormButton";
import { updateBookingAction } from "@/app/_lib/action";
import { getBooking, getSettings } from "@/app/_lib/data-service";
import React from "react";

export default async function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  const { reservationId } = params;
  const [booking, settings]: [
    { numGuests: number; observations: string },
    { maxGuestPerBooking: number }
  ] = await Promise.all([getBooking(reservationId), getSettings()]);

  const { maxGuestPerBooking } = settings;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={async (formData) => {
          "use server";
          return updateBookingAction(formData, reservationId);
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={booking.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            {Array.from({ length: maxGuestPerBooking }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking.observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateReservationFormButton />
        </div>
      </form>
    </div>
  );
}
