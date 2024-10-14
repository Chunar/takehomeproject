import React, { createContext, useEffect, useState } from "react";

import bookingsJSON from "../data/bookings.json";

const BookingsContext = createContext();

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(bookingsJSON.bookings);
  }, []);

  return (
    <BookingsContext.Provider value={bookings}>
      {children}
    </BookingsContext.Provider>
  );
};

export { BookingsContext, BookingsProvider };
