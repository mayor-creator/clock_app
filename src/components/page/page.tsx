import { useState } from "react";

import { Quote } from "../quote/quote";
import { Time } from "../time/time";
import { Button } from "../ui/button/button";
import { Information } from "../info/info";

import arrowDownIcon from "../../assets/images/desktop/icon-arrow-down.svg";
import arrowUpIcon from "../../assets/images/desktop/icon-arrow-up.svg";

export function MainPage() {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfoClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <main>
      {!showInfo && <Quote />}

      <Time />

      <Button
        title={showInfo ? "Less" : "More"}
        onClick={handleShowInfoClick}
        imageUrl={showInfo ? arrowUpIcon : arrowDownIcon}
      />

      {showInfo && (
        <Information location="Europe/London" year="295" day="5" week="42" />
      )}
    </main>
  );
}
