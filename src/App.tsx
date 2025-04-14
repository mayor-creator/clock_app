import { useEffect } from "react";

import { MainPage } from "./components/page/page";
import desktopLight from "../src/assets/images/desktop/bg-image-daytime.jpg";
import desktopDark from "../src/assets/images/desktop/bg-image-nighttime.jpg";
import tabletLight from "../src/assets/images/tablet/bg-image-daytime.jpg";
import tabletDark from "../src/assets/images/tablet/bg-image-nighttime.jpg";
import mobileLight from "../src/assets/images/mobile/bg-image-daytime.jpg";
import mobileDark from "../src/assets/images/mobile/bg-image-nighttime.jpg";
import "./App.css";

const backgroundImage: Record<string, string> = {
  "desktop-light": desktopLight,
  "desktop-dark": desktopDark,
  "tablet-light": tabletLight,
  "tablet-dark": tabletDark,
  "mobile-light": mobileLight,
  "mobile-dark": mobileDark,
};

const getTimeOfDay = (): "light" | "dark" => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
};

const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  const width = window.innerWidth;
  if (width <= 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

function App() {
  useEffect(() => {
    const updateBackground = () => {
      const theme = getTimeOfDay();
      const device = getDeviceType();
      const key = `${device}-${theme}`;
      document.body.style.backgroundImage = `url(${backgroundImage[key]})`;
    };

    // Initial update
    updateBackground();

    // Update background every minute
    const intervalId = setInterval(updateBackground, 60000);

    // Handle window resize
    const handleResize = () => {
      updateBackground();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="root">
      <MainPage />
    </div>
  );
}

export default App;
