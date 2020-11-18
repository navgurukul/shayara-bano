import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./qrcode.module.css";
import QR from "/home/saquib/Desktop/Projects/NG/email-be/qrcode/qr.png";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const QrCode = (props) => {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.isOpen}
      onClick={props.clicked}
    >
      <img src={QR} alt="QR Code" className={styles.img} />
      {/* <img src="https://qrcode.merakilearn.org/qr.png" alt="QR Code" /> */}
    </Backdrop>
  );
};

export default QrCode;
