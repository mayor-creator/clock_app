import { useState } from "react";
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
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const getTimeIcon = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? sunIcon : moonIcon;
  };

  return (
    <main className={styles.container}>
      {!showInfo && <Quote />}
      <div className={styles.mainContent}>
        <Time imageUrl={getTimeIcon()} />
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
