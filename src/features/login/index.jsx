/**
 * This component is to simulate a login page.
 * Users will have the option to safely login as a provider or client with their credentials.
 * Due to time constraint I'm making it a choice with selecting whatever account you want to test.
 */
import { useState } from "react";
import Client from "../client";
import Provider from "../provider";

import "./styles.css";

export default function Login() {
  const [state, setState] = useState();

  let render;
  switch (state) {
    case "client":
      render = <Client />;
      break;
    case "provider":
      render = <Provider />;
      break;
    default:
      render = (
        <div className="login-container">
          <div className="client">
            <button onClick={() => setState("client")}>Login as Client</button>
          </div>
          <div className="provider">
            <button onClick={() => setState("provider")}>
              Login as Provider
            </button>
          </div>
        </div>
      );
  }
  return render;
}
