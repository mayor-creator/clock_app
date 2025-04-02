import { useState } from "react";

import { Quote } from "../quote/quote";
import { Time } from "../time/time";
import { Button } from "../ui/button/button";
import { Information } from "../info/info";

import refreshIcon from "../../assets/images/desktop/icon-refresh.svg";
import arrowDownIcon from "../../assets/images/desktop/icon-arrow-down.svg";
import arrowUpIcon from "../../assets/images/desktop/icon-arrow-up.svg";

export function MainPage() {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfoClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <main>
      {!showInfo && (
        <Quote
          quote="The science of operations, as derived from mathematics more especially, 
        is a science of itself, and has its own abstract truth and value."
          imageUrl={refreshIcon}
          author="Ada Lovelace"
        />
      )}

      <Time
        greeting="Good morning, It's currently"
        time="11:37 BST"
        location="IN LONDON, UK"
      />

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
