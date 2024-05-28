import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    title: {
      display: false,
      text: "This is a pie chart",
    },
  },
};

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Steps",
      data: [4000, 7000, 3500, 8880, 3000, 2000, 5000],
      hoverOffset: 4,
      backgroundColor: [
        "lightgreen",
        "lightblue",
        "pink",
        "red",
        "green",
        "blue",
        "yellow",
      ],
    },
  ],
};

export default function PieComponent({ heading }) {
  return (
    <section className="border bg-white rounded-2xl">
      <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">Total Quiz Taken</p>
      </div>
      <div className="flex justify-center items-center w-full h-full py-6">
        <div className="w-[300px] h-[300px]">
          <Pie options={options} data={data} />
        </div>
      </div>
    </section>
  );
}
