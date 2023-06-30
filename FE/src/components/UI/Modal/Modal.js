import Button from "../Button";
import classes from "./Modal.module.css";

import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const errorContent = (
    <>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{props?.title}</h2>
      </div>
      <div className={classes.contentContainer}>
        <p className={classes.message}>{props?.message}</p>
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={props.clearError}>Go Back</Button>
      </div>
    </>
  );

  const loadingContent = <div className={classes.loader}></div>;

  return (
    <div className={classes.modal}>
      {props.clearError ? errorContent : loadingContent}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          clearError={props.clearError}
          title={props.title}
          message={props.message}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
