import classes from "./ChangeZoneComponent.module.css";

import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { addressLoader } from "../util/address";

const ChangeZoneComponent = () => {
  const { address, city } = addressLoader();

  return (
    <div className={classes.addressNameContainer}>
      <div className={classes.addressContainer}>
        <CiLocationOn />
        <p className={classes.address}>
          {address} - {city}
        </p>
      </div>
      <Link to={"/"} className={classes.linkToHome}>
        Change Zone
      </Link>
    </div>
  );
};

export default ChangeZoneComponent;
