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

interface InfoProps {
  location: string;
}

export function Information({ location }: InfoProps) {
  // Get the current date
  const currentDate = new Date();
  const { dayOfYear, dayName, weekNumber } = getDateInfo(currentDate);

  return (
    <section>
      <div>
        <article>
          <p>CURRENT TIMEZONE</p>
          <p>{location}</p>
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
