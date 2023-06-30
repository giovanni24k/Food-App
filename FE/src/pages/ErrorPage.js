import classes from "./ErrorPage.module.css";

import { useRouteError, Link } from "react-router-dom";

import Button from "../components/UI/Button";

const ErrorPage = () => {
  const error = useRouteError();

  let title;
  let message;

  console.error(error);

  if (error.status === 404) {
    title = `An error occured with status ${error.status}`;
    message = "Resource Not Found.";
  }

  return (
    <>
      <div className={classes.errorContainer}>
        <h1 className={classes.errorTitle}>{title}</h1>
        <h1>...</h1>
        {/* <p className={classes.errorMessage}>{error.data.message || message}</p> */}
        <Link className={classes.linkButton} to={"/"}>
          <Button>Go Back</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
