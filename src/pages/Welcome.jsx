import React, { useEffect } from "react";
import { logError } from "../common/logger";
import WelcomeBody from "../components/WelcomeBody";
import { fetchAndStoreUser } from "../services/user-service";
import Header from "./../components/Header";

export default function Welcome() {
  useEffect(() => {
    (async () => {
      try {
        await fetchAndStoreUser();
      } catch (e) {
        logError(e);
      }

    })()
    return () => {}
  }, [])
  return (
    <div>
      <Header />
      <WelcomeBody />
    </div>
  );
}
