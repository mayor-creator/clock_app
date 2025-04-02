interface TimeProps {
  greeting: string;
  time: string;
  location: string;
  imageUrl?: string;
}

export function Time({ greeting, time, location, imageUrl }: TimeProps) {
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
