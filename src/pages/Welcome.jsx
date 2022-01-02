import React, { useEffect } from "react";
import { logError } from "../common/logger";
import WelcomeBody from "../components/WelcomeBody";
import { UserData } from "../models/models";
import { fetchUser, setUser } from "../services/user-service";
import Header from "./../components/Header";

export default function Welcome() {
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUser();
        const value = await UserData.validateAsync(res.data, { stripUnknown: true });
        setUser(value);
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
