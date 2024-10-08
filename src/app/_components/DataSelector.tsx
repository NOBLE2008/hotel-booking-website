"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservations } from "./ReservationsContext";

function isAlreadyBooked(range: any, datesArr: any) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: any) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector(props: any) {
  const reservationsContext: any = useReservations();
  const { range, setRange, resetRange } = reservationsContext;
  const {
    cabin,
    settings,
    bookedDates,
  }: { cabin: any; settings: any; bookedDates: [] } = props;

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  // CHANGE
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayedRange?.to || null, displayedRange?.from || null);
  const cabinPrice = (regularPrice - discount) * numNights;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        onSelect={(selectedRange: any) => {
          setRange(selectedRange);
        }}
        selected={displayedRange}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) => {
          return (
            isPast(curDate) ||
            bookedDates.some((date: any) => {
              return isSameDay(date, curDate);
            })
          );
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
