import ProfileFormButton from "@/app/_components/ProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { updateGuestAction } from "@/app/_lib/action";
import { auth, signIn } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export default async function Page() {
  // CHANGE
  const session = await auth();
  const user: {
    fullName: string;
    email: string;
    countryFlag: string;
    nationalID: string;
    nationality: string;
  } = await getGuest(session?.user?.email ?? "");

  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateGuestAction}
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            defaultValue={user?.fullName}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={user?.email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={user?.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

          <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={user?.nationality ?? ""}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            defaultValue={user?.nationalID}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <ProfileFormButton />
        </div>
      </form>
    </>
  );
}
