import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
  title: {
    display: false,
    text: "This is a bar chart",
  },
},
  data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [3000, 5000, 4500, 2800, 8000, 6000, 7000],
        borderColor: "red",
        borderWidth: 1,
        backgroundColor: "pink",
      },
      {
        label: "Steps",
        data: [4000, 7000, 3500, 8880, 3000, 2000, 5000],
        borderColor: "green",
        borderWidth: 1,
        backgroundColor: "lightgreen",
      },
    ],
  };

export default function BarComponent() {
  return (
    <section className="border bg-white rounded-2xl">
      <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">Total Employee Taken</p>
      </div>
      <div className="flex justify-center items-center w-full h-full py-6">
        <div className="w-[400px] h-[300px]">
          <Bar options={options} data={data} />
        </div>
      </div>
    </section>
  );
}
