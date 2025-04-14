import { useState, useEffect } from "react";
import styles from "./time.module.css";

interface TimeProps {
  imageUrl?: string;
}

async function getIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error getting IP address: ", error);
    return null;
  }
}

interface LocationInfo {
  city: string;
  country: string;
}

async function getLocationInfo(): Promise<LocationInfo | null> {
  try {
    // Check if we have cached location data
    const cachedLocation = localStorage.getItem('userLocation');
    if (cachedLocation) {
      return JSON.parse(cachedLocation);
    }

    const ipAddress = await getIpAddress();
    if (!ipAddress) {
      throw new Error("Failed to get IP address");
    }
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const locationData = {
      city: data.city,
      country: data.country_name,
    };

    // Cache the location data
    localStorage.setItem('userLocation', JSON.stringify(locationData));
    return locationData;
  } catch (error) {
    console.error("Error in getLocation:", error);
    return null;
  }
}

export function Time({ imageUrl }: TimeProps) {
  const [userGreeting, setUserGreeting] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userTime, setUserTime] = useState<string>("");

  const getTimeGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
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

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocationInfo();
        if (location) {
          setUserLocation(`${location.city}, ${location.country}`);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setUserLocation(null);
      }
    };
    fetchLocation();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.greeting}>
        {imageUrl && <img src={imageUrl} alt="Time of day indicator" />}
        <p className={styles.greetingText}>{userGreeting}</p>
      </div>
      <div className={styles.timeSection}>
        <p className={styles.time}>{userTime}</p>
        {userLocation && <p className={styles.location}>in {userLocation}</p>}
      </div>
    </section>
  );
}
