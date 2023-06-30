import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "../util/auth";

import Navbar from "../components/UI/Navbar";

const RootLayout = () => {
  const submit = useSubmit();

  const logoutHandler = () => {
    submit(null, { action: "logout", method: "post" });
  };

  const token = useLoaderData();

  useEffect(() => {
    if (!token || token === "EXPIRED") {
      submit(null, { action: "logout", method: "post" });
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <Navbar onLogoutHandler={logoutHandler} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
