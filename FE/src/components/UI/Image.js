import classes from "./Image.module.css";

const Image = (props) => {
  return (
    <img
      className={`${props.className} ${classes.image}`}
      src={props.imageSrc}
      alt=""
    />
  );
};

export default Image;
