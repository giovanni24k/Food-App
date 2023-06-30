import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  return <AuthForm />;
};

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 442 });
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/api/user/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 404) {
    return json(
      { message: "User with these credentials were not found!" },
      { status: response.status }
    );
  }

  if (response.status === 500) {
    throw json(
      { message: "Could not authenticate user" },
      { status: response.status }
    );
  }

  const responseData = await response.json();
  const token = responseData.token;

  localStorage.setItem("token", token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
};

export default AuthPage;
