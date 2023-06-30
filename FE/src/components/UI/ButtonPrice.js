import classes from "./ButtonPrice.module.css";

const ButtonPrice = ({ className, children }) => {
  return (
    <button className={`${className} ${classes.buttonPrice}`}>{children}</button>
  );
};

export default ButtonPrice
