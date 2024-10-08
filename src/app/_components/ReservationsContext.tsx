"use client";
import React, { createContext, useContext, useState } from "react";

const ReservationsContext = createContext({});
export default function ReservationsProvider(props: any) {
  const { children } = props;
  const [range, setRange] = useState({
    from: null,
    to: null,
  });
  const resetRange = () => {
    setRange({ from: null, to: null });
  }
  return (
    <ReservationsContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
    const context = useContext(ReservationsContext);
    if (!context) {
      throw new Error("useReservations must be used within a ReservationsProvider");
    }
    return context;

}
