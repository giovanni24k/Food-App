import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

import useInput from "../hooks/use-input";

const has6CharacterOrMore = (value) => value.trim().length > 6;
const isEmail = (value) => value.includes("@");

const AuthForm = ({ request }) => {
  const submit = useSubmit();

  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(has6CharacterOrMore);

  let formIsValid = true;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    submit(
      { email: emailValue, password: passwordValue },
      {
        action: `/auth?mode=${isLogin ? "login" : "signup"}`,
        method: "post",
      }
    );

    resetEmail();
    resetPassword();
  };

  return (
    <>
      <Form onSubmit={submitHandler} method="post" className={classes.form}>
        <h1 className={classes.title}>{isLogin ? "Login" : "Signup"}</h1>

        {data && data.message && (
          <div className={classes.credentialsErrorContainer}>
            <p className={classes.credentialsErrorText}>{data.message}</p>
          </div>
        )}

        <input
          required
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailValue}
          className={emailHasError ? classes.inputError : classes.input}
          placeholder="Insert email"
          id="email"
          type="email"
          name="email"
        />
        {emailHasError && (
          <p className={classes.textError}>Email must include "@"</p>
        )}

        <input
          required
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordValue}
          className={passwordHasError ? classes.inputError : classes.input}
          placeholder="Insert password"
          id="password"
          type="password"
          name="password"
        />
        {passwordHasError && (
          <p className={classes.textError}>
            Password must have 6 characters or more
          </p>
        )}

        <div className={classes.actions}>
          <Link
            onClick={() => [resetEmail(), resetPassword()]}
            className={classes.link}
            to={`?mode=${isLogin ? "signup" : "login"}`}
          >
            {isLogin
              ? "First Time? Create new User"
              : "Already registered? Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Signup"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
