"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getCountries,
  getGuest,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  // Implement sign-in logic here
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId: string) {
  const booking = await getBooking(bookingId);
  const session = await auth();
  const userId = session?.user?.id;
  if (!booking) throw new Error("Booking not found");

  if (booking.guestId !== userId)
    throw new Error("You are unauthorized to delete this booking");
  // Delete booking from database
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function createReservation(
  additionalData: { cabinId: any },
  formData: FormData
) {
  const session = await auth();
  if (!session?.user)
    throw new Error("You must be logged in to create a reservation");
  const guestId = session?.user?.id;
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const computedBooking = {
    ...additionalData,
    guestId,
    numGuests,
    observations,
    created_at: new Date(),
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };
  await createBooking(computedBooking);
  revalidatePath(`/cabins/${additionalData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBookingAction(
  formData: FormData,
  bookingId: string
) {
  // @ts-ignore
  const [session, booking]: [{ user: { id: number } }, any] = await Promise.all(
    [auth(), getBooking(bookingId)]
  );
  const userId = session?.user?.id;
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  await updateBooking(bookingId, { numGuests, observations });
  revalidatePath(`/account/reservations/${bookingId}`);
}

export async function updateGuestAction(formData: FormData) {
  //Extract National ID and encodedNationality from Form Data
  const nationalId: any = formData.get("nationalID") ?? "";
  const encodedNationality: any = formData.get("nationality") ?? "";

  //Validate National ID Length and Format
  const regex = /^[a-zA-Z0-9]{6,10}$/;
  if (!regex.test(nationalId)) {
    throw new Error("Invalid National ID");
  }

  //Extract Nationality and Flag from Encoded String
  const [nationality, countryFlag] = encodedNationality.split("%") ?? ["", ""];

  //Fetch Countries and Session
  const [session, countries]: [any, any] = await Promise.all([
    auth(),
    getCountries(),
  ]);

  //Verify Country and Flag Existence
  const country = countries.find((c: { name: string; flag: string }) => {
    return c.name === nationality && c.flag === countryFlag;
  });
  if (!country) {
    throw new Error("Invalid Nationality");
  }

  //Update Guest Record with New Nationality and Flag in Database
  await updateGuest(session?.user?.id, {
    nationality,
    countryFlag,
    nationalID: nationalId,
  });
  revalidatePath("/account/profile");
}
