import Calendar from "@/components/calendar-date";
import { useEffect, useState } from "react";

export default function CalendarComponent() {
  const [fDate, setFDate] = useState();
  const [lDate, setLDate] = useState();

  const isDateDisabledF = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of today
    date.setHours(0, 0, 0, 0); // Set the time of the date being checked to the beginning of the day
    return date < today; // Disable dates before today
  };
  const isDateDisabledL = (date) => {
    if (!fDate) return true; // Disable all dates if fDate is not set
    date.setHours(0, 0, 0, 0); // Set the time of the date being checked to the beginning of the day
    return date < fDate; // Disable dates before the selected fDate
  };

  useEffect(() => {
    console.log(fDate);
  }, [fDate]);
  useEffect(() => {
    console.log(lDate);
  }, [lDate]);

  return (
    <div>
      <Calendar isDateDisabled={isDateDisabledF} onChange={setFDate} />
      <Calendar isDateDisabled={isDateDisabledL} onChange={setLDate} />
    </div>
  );
}
