import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import { DoctorsContext } from "../../context/doctorContext";

import "react-datepicker/dist/react-datepicker.css";
import "./createAppointment.css";

import bookings from "../../data/bookings.json";

export default function CreateAppointment({ onClose }) {
  const providers = useContext(DoctorsContext);
  function getSlots() {
    return Array.from({ length: 11 }, (_, i) => {
      const hour = 8 + i;
      return hour < 12
        ? `${hour}:00:00 AM`
        : hour === 12
        ? "12:00:00 PM"
        : `${hour - 12}:00:00 PM`;
    });
  }
  const [dateSelected, setDateSelected] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState(getSlots);
  const [timeSelected, setTimeSelected] = useState();
  const [providerSelected, setProviderSelected] = useState(null);

  useEffect(() => {
    const filteredBookings = bookings.bookings
      .filter((b) => b.provider == providerSelected)
      .filter((b) => new Date(b.start_time).getDate() == dateSelected.getDate())
      .map((b) => new Date(b.start_time).toLocaleTimeString());
    const slots = getSlots().filter((s) => !filteredBookings.includes(s));
    setAvailableTimeSlots(slots);
  }, [dateSelected, providerSelected]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <label htmlFor="doctor-select">Select Doctor:</label>
        <select
          id="doctor-select"
          value={providerSelected}
          onChange={(e) => setProviderSelected(e.target.value)}
        >
          <option value="">--Select a Provider--</option>
          {providers.map((provider, index) => (
            <option key={index} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
        {providerSelected && (
          <div>
            <DatePicker
              selected={dateSelected}
              onChange={(date) => setDateSelected(date)}
            />
            <p className="timeDesc">Available Time Slots :</p>
            <div className="slots">
              {availableTimeSlots.map((t) => (
                <div
                  className="time"
                  onClick={() =>
                    setTimeSelected(
                      new Date(
                        `${dateSelected.toDateString()} ${t}`
                      ).toLocaleString()
                    )
                  }
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}
        {timeSelected && (
          <div>
            <p>Time Selected: {timeSelected}</p>
            <button>Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
}
