import classes from "./Button.module.css";

const Button = ({ className, children, onClick }) => {
  return (
    <button className={`${className} ${classes.button}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
