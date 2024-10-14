import { useState } from "react";
import DatePicker from "react-datepicker";
import Scheduler from "./scheduler";

import providers from "../../data/providers.json";
import bookings from "../../data/bookings.json";
import services from "../../data/services.json";

// css for the package.
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export default function Provider() {
  const [dateSelected, setDateSelected] = useState(new Date());

  return (
    <div className="provider-container">
      <DatePicker
        selected={dateSelected}
        onChange={(date) => setDateSelected(date)}
      />
      <Scheduler providers={providers.providers} bookings={bookings.bookings} />
    </div>
  );
}
