import { useState, useEffect } from "react";

interface TimeProps {
  imageUrl?: string;
}

export function Time({ imageUrl }: TimeProps) {
  const [userGreeting, setUserGreeting] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userTime, setUserTime] = useState<string>("");

  const getTimeGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    // Initial settings
    setUserGreeting(getTimeGreeting());
    setUserTime(getCurrentTime());

    // Update greeting every minute
    const greetingIntervalId = setInterval(() => {
      setUserGreeting(getTimeGreeting());
    }, 60000);

    // Update time every minute
    const timeIntervalId = setInterval(() => {
      setUserTime(getCurrentTime());
    }, 60000);

    // Cleanup intervals
    return () => {
      clearInterval(greetingIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  const success = (position: GeolocationPosition): void => {
    const { coords } = position;
    setUserLocation(
      `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`
    );
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, (error) => {
        console.error("Error getting geolocation", error);
        setUserLocation("Location not available");
      });
    } else {
      console.log("Geolocation is not available");
      setUserLocation("Geolocation not supported");
    }
  }, []);

  return (
    <>
      <div>
        <img src={imageUrl} alt="" />
        <p>{userGreeting}</p>
      </div>
      <div>
        <p>Current Time: {userTime}</p>
        <p>Current Location: {userLocation}</p>
      </div>
    </>
  );
}
