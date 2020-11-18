import React from "react";
import styles from "./qrcode.module.css";

import QR from "/home/saquib/Desktop/Projects/NG/email-be/qrcode/qr.png";

const QrCode = () => {
  return (
    <div className={styles.main}>
      <img src={QR} alt="QR Code" className={styles.img} />
    </div>
  );
};

export default QrCode;
