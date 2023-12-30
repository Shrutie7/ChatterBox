import React from "react";
import Modal from "react-bootstrap/Modal";
import ldpopup from "./loadingpopup.module.css";
import Spinner from "react-bootstrap/Spinner";
import { CircularProgress } from "@material-ui/core";

function LoadingPopup({ state, message }) {
  // const [spin,setspin] = useState(state)

  return (
    <div>
      <Modal
        show={state}
        size="sm"
        centered
      >
        <Modal.Body>
          <div className={ldpopup.modalspinbody}>
            {/* <Spinner size="xl" animation="border" variant="primary" className={ldpopup.spinner} ></Spinner> */}
            <CircularProgress color="white" size="20px" />
            <span className={ldpopup.spinbody}>{message}</span>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default LoadingPopup;
