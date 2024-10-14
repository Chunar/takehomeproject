import { useState } from "react";
import "./scheduler.css";

/**
 * Assuming clinic is open from 8AM to 7PM and each slot is 1 hour.
 */

const timeSlots = Array.from({ length: 11 }, (_, i) => {
  const hour = 8 + i;
  return hour < 12
    ? `${hour}:00 AM`
    : hour === 12
    ? "12:00 PM"
    : `${hour - 12}:00 PM`;
});

export default function Scheduler({ providers, bookings }) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  /**
   * On click show a modal with more details of the appointment.
   */
  const showModal = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="scheduler">
      <table>
        <thead>
          <tr>
            <th></th>
            {providers.map((provider, i) => (
              <th key={i}>{provider.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, i) => (
            <tr key={i}>
              <td>{timeSlot}</td>
              {providers.map((provider) => {
                const booking = bookings.find(
                  (b) =>
                    b.provider === provider.id &&
                    new Date(b.start_time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }) === timeSlot
                );
                return (
                  <td
                    key={provider.name}
                    className={booking ? "booked" : ""}
                    onClick={() => booking && showModal(booking)}
                  >
                    {booking ? "Booked" : "Available"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Booking Details</h2>
            <p>
              <strong>provider:</strong> {selectedBooking.provider}
            </p>
            <p>
              <strong>Time:</strong> {selectedBooking.start_time}
            </p>
            <p>
              <strong>Patient:</strong> {selectedBooking.client}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
