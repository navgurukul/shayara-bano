import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import QR from "/home/saquib/Desktop/Projects/NG/email-be/qrcode/qr.png";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const QrCode = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <img src={QR} alt="QR Code" />
      {/* <img src="https://qrcode.merakilearn.org/qr.png" alt="QR Code" /> */}
    </Backdrop>
  );
};

export default QrCode;
