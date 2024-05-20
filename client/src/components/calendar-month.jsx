import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger className="w-[150px] rounded-3xl bg-white">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent className="max-h-[10rem]">
        {months.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
