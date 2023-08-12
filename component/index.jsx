import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

const CountdownTimer = ({ targetDate }) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const calculateCountdown = () => {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = targetTime - currentTime;

      if (remainingTime < 0) {
        setCountdown(null);
      } else {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        setCountdown(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  return (
    <p className={styles.container}>
      {countdown ? <span>{countdown}</span> : <span>OPEN</span>}
    </p>
  );
};

export default CountdownTimer;
