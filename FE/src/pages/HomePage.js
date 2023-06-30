import classes from "./HomePage.module.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";

import Image from "../components/UI/Image";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal/Modal";
import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import { setAddress } from "../util/address";

const isAddress = (value) => value.trim().length > 0;

const HomePage = () => {
  const navigate = useNavigate();

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    inputFocusHandler: addressFocusHandler,
    reset: resetAddress,
  } = useInput(isAddress);

  const { isLoading, data, error, clear, sendRequest, reqExtra } = useHttp();

  const url = `http://localhost:8080/api/food/getAllFoodStores?address=${enteredAddress}`;

  const searchFoodStoresByAddressHandler = async () => {
    if (!addressIsValid) return;

    const dataToSend = {
      url: url,
      method: "GET",
      reqExtra: enteredAddress,
    };

    sendRequest(dataToSend);
    resetAddress();
  };

  useEffect(() => {
    if (!data) return;

    setAddress(reqExtra, data[0].location.city);

    navigate(`${reqExtra}`, {
      state: { foodStoresData: data },
    });
  }, [data, navigate, reqExtra]);

  return (
    <>
      {error && (
        <Modal clearError={clear} title={error.title} message={error.message} />
      )}
      {isLoading && <Modal />}
      <div className={error ? "" : classes.homePageContainer}>
        <div className={classes.homeImageContainer}>
          <Image imageSrc="https://d2egcvq7li5bpq.cloudfront.net/a/hw/img/decoration/bg_hero-wide.jpg" />
        </div>
        <div className={classes.searchContainer}>
          <h1 className={classes.searchTitle}>Start Your Experience Here</h1>
          <p className={classes.searchDescription}>
            Find restaurants delivering right now, near you
          </p>
          <div className={classes.inputSearchContainer}>
            <AiOutlineSearch className={classes.searchIcon} />
            <input
              value={enteredAddress}
              onFocus={addressFocusHandler}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
              className={
                addressHasError ? classes.inputSearchError : classes.inputSearch
              }
              placeholder="Enter your address"
              type="text"
            />
            <div className={classes.buttonContainer}>
              <Button
                onClick={searchFoodStoresByAddressHandler}
                className={classes.button}
              >
                Search
              </Button>
            </div>
          </div>
          {addressHasError && (
            <div className={classes.errorContainer}>
              <CiWarning className={classes.errorIcon} />
              <p className={classes.errorMessage}>Entered a valid value!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
