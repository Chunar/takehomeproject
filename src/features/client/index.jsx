import { useState } from "react";

import CreateAppointment from "./createAppointment";

import bookings from "../../data/bookings.json";
import services from "../../data/services.json";
import clients from "../../data/clients.json";

export default function Client({ id = "1" }) {
  const [client, setClient] = useState(
    ...clients.clients.filter((c) => c.id === id)
  );
  const [showModal, setShowModal] = useState(false);

  /**
   * Getting appointments for the client id and start time in future.
   */
  const upcomingAppointments = bookings.bookings.filter(
    (b) =>
      b.client === client.id &&
      new Date(b.start_time).getTime() > new Date().getTime()
  );

  const showAppointments = upcomingAppointments.length ? (
    <div>
      <h3 className="subHeading">Here are your upcoming appointments</h3>
    </div>
  ) : (
    <h3 className="subHeading">You have no upcoming appointments.</h3>
  );

  return (
    <div className="client-container">
      <h1 className="title">Welcome {client.name},</h1>
      {showAppointments}
      <div className="add" onClick={() => setShowModal(true)}>
        Create Appointment
      </div>
      {showModal && <CreateAppointment onClose={() => setShowModal(false)} />}
    </div>
  );
}
