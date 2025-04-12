import { useState, useEffect } from "react";

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
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    const theme = getTimeOfDay();
    const device = getDeviceType();
    const key = `${device}-${theme}`;
    setBgImage(backgroundImage[key]);
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            zIndex: "1",
          }}
        >
          <MainPage></MainPage>
        </div>
      </div>
    </>
  );
}

export default App;
