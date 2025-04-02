interface InfoProps {
  location: string;
  day: string;
  year: string;
  week: string;
}

export function Information({ location, day, year, week }: InfoProps) {
  return (
    <>
      <div>
        <div>
          <p>CURRENT TIMEZONE</p>
          <p>{location}</p>
        </div>
        <div>
          <p>DAY OF THE YEAR</p>
          <p>{year}</p>
        </div>
      </div>
      <div>
        <div>
          <p>DAY OF THE WEEK</p>
          <p>{day}</p>
        </div>
        <div>
          <p>WEEK NUMBER</p>
          <p>{week}</p>
        </div>
      </div>
    </>
  );
}
