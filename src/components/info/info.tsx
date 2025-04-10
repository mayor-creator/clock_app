import { useState, useEffect } from "react";

interface DateProps {
  dayOfYear: number;
  dayName: string;
  weekNumber: number;
}

function getDateInfo(date: Date): DateProps {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(diff / oneDay);
  const dayOfWeek = date.getDay();
  const weekNumber = Math.ceil((dayOfYear + 1) / 7);

  // Get the name of the day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dayOfWeek];

  return { dayOfYear, dayName, weekNumber };
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
  timezone: string;
}

async function getLocationInfo(): Promise<LocationInfo | null> {
  try {
    const ipAddress = await getIpAddress();
    if (!ipAddress) {
      throw new Error("Failed to get IP address");
    }
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      timezone: data.timezone,
    };
  } catch (error) {
    console.log("Error in getLocation:", error);
    return null;
  }
}

export function Information() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  // Get the current date
  const currentDate = new Date();
  const { dayOfYear, dayName, weekNumber } = getDateInfo(currentDate);

  //Get the current location
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getLocationInfo();
      setLocationInfo(location);
    };
    fetchLocation();
  }, []);

  return (
    <section>
      <div>
        <article>
          <p>CURRENT TIMEZONE</p>
          <p>{locationInfo?.timezone}</p>
        </article>
        <article>
          <p>DAY OF THE YEAR</p>
          <p>{dayOfYear}</p>
        </article>
      </div>
      <div>
        <article>
          <p>DAY OF THE WEEK</p>
          <p>{dayName}</p>
        </article>
        <article>
          <p>WEEK NUMBER</p>
          <p>{weekNumber}</p>
        </article>
      </div>
    </section>
  );
}
