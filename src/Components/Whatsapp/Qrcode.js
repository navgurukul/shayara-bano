import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./qrcode.module.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const QrCode = (props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true} onClick={props.clicked}>
      <img className={styles.img} src={props.base64} alt="QR Code" />
    </Backdrop>
  );
};

export default QrCode;
