import React from "react";
import styles from "./qrcode.module.css";
import qr from "/home/rakhmabai/qrcode/qr.png";

const QrCode = () => {
  return (
    <div className={styles.main}>
      <img
        qr={qr}
        // src="https://qrcode.merakilearn.org/qr.png"
        alt="QR Code"
        className={styles.img}
      />
    </div>
  );
};

export default QrCode;
