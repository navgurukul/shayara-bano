import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./qrcode.module.css";
// import qr from "/home/saquib/Desktop/Projects/NG/email-fe/qr.png";

const QrCode = () => {
  const [showQR, setShowQR] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowQR(true);
    }, 5000);
  }, []);
  let toDisplay = <Skeleton variant="rect" width={310} height={350} />;
  if (showQR) {
    toDisplay = (
      <>
        {/* <img
          src={qr}
          src="https://qrcode.merakilearn.org/qr.png"
          alt="QR Code"
          className={styles.img}
        /> */}
        <br />
        <div className={styles.button}>
          <Button type="submit" variant="contained" color="secondary">
            Send Message
          </Button>
        </div>
      </>
    );
  }

  return <div className={styles.main}>{toDisplay}</div>;
};

export default QrCode;
