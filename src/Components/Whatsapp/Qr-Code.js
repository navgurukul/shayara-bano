import React from "react";
import styles from "./qrcode.module.css";

const QrCode = () => {
  return (
    <div className={styles.main}>
      <img
        src="https://qrcode.merakilearn.org/qr.png"
        alt="QR Code"
        className={styles.img}
      />
    </div>
  );
};

export default QrCode;
