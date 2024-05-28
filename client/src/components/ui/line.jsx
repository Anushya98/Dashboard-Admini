import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "This is a pie chart",
    },
  },
  data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [3000, 5000, 4500, 2800, 8000, 6000, 7000],
        borderColor: "red",
        // backgroundColor: "pink",
      },
      {
        label: "Steps",
        data: [4000, 7000, 3500, 8880, 3000, 2000, 5000],
        borderColor: "green",
        // backgroundColor: "lightgreen",
      },
    ],
  };

export default function LineComponent() {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
