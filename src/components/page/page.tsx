import { useState, useEffect } from "react";
import styles from "./page.module.css";

import { Quote } from "../quote/quote";
import { Time } from "../time/time";
import { Button } from "../ui/button/button";
import { Information } from "../info/info";

import arrowDownIcon from "../../assets/images/desktop/icon-arrow-down.svg";
import arrowUpIcon from "../../assets/images/desktop/icon-arrow-up.svg";
import moonIcon from "../../assets/images/desktop/icon-moon.svg";
import sunIcon from "../../assets/images/desktop/icon-sun.svg";

export function MainPage() {
  const getTimeIcon = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? sunIcon : moonIcon;
  };

  const [showInfo, setShowInfo] = useState(false);
  const [timeIcon, setTimeIcon] = useState(getTimeIcon());

  const handleShowInfoClick = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    // Update icon every minute
    const intervalId = setInterval(() => {
      setTimeIcon(getTimeIcon());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className={styles.container}>
      {!showInfo && <Quote />}
      <div className={styles.mainContent}>
        <Time imageUrl={timeIcon} />
        <Button
          title={showInfo ? "Less" : "More"}
          onClick={handleShowInfoClick}
          imageUrl={showInfo ? arrowUpIcon : arrowDownIcon}
        />
      </div>
      {showInfo && <Information />}
    </main>
  );
}
