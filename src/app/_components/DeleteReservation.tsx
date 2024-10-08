"use client";
import { deleteReservation } from "@/app/_lib/action";
import { useTransition } from "react";
import { HiTrash } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation(props: any) {
  const { handleDelete } = props;
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={() => handleDelete(startTransition)}
    >
      <HiTrash className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <span className="mt-1">Delete</span>
      )}
    </button>
  );
}

export default DeleteReservation;
