import Login from "./features/login";

import { DoctorsProvider } from "./context/doctorContext";
import { BookingsProvider } from "./context/bookingContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <DoctorsProvider>
        <BookingsProvider>
          <Login />
        </BookingsProvider>
      </DoctorsProvider>
    </div>
  );
}

export default App;
