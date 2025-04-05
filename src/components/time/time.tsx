interface TimeProps {
  greeting: string;
  time: string;
  location: string;
  imageUrl?: string;
}

export function Time({ greeting, time, location, imageUrl }: TimeProps) {
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
  } else {
    console.log("geolocation is not available");
  }

  function success(position: GeolocationPosition) {
    console.log(position);
    const { coords } = position;
    console.log("latitude data: " + coords.latitude);
    console.log("longitude data: " + coords.longitude);
  }

  navigator.geolocation.getCurrentPosition(success);
  navigator.geolocation.watchPosition(success);

  return (
    <>
      <div>
        <img src={imageUrl} alt="" />
        <p>{greeting}</p>
      </div>
      <div>
        <p>{time}</p>
        <p>{location}</p>
      </div>
    </>
  );
}
