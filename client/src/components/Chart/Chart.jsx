import Line from "./components/line";
import Bar from "./components/bar";
import Pie from "./components/pie";

export default function Chart() {
  return (
    <div className="flex flex-col gap-4">
      <Pie />
      <Bar />
      <Line />
    </div>
  );
}
