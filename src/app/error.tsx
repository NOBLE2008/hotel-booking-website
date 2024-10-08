"use client";
export default function Error(props: any) {
  const { error, reset } = props;
  const handleReset = () => {
    reset();
    window.location.href = "/";
  };
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={handleReset}
      >
        Try again
      </button>
    </main>
  );
}
