import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Disable the default legend
        },
        title: {
            display: false,
            text: "This is a doughnut chart",
        },
    },
    cutout: "70%", // Creates the space in the center
};

const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Steps",
            data: [4000, 7000, 3500, 8880, 3000, 2000, 5000],
            hoverOffset: 4,
            backgroundColor: [
                "#5b7fe9",
                "#26408c",
                "#50b6ff",
                "#50a6ff",
                "#50cdff",
                "#5093ff",
                "#5086ff",
            ],
        },
    ],
};

export default function DoughnutComponent({ heading }) {
    return (
        <section className="border bg-white rounded-2xl">
            <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
                <p className="text-white font-medium">Employement Status</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-6">
                <div className="w-[150px] h-[150px]">
                    <Doughnut options={options} data={data} />
                </div>
                <div className="mt-4 gap-4 w-[30%]">
                    {data.labels.map((label, index) => (
                        <div key={index} className="flex justify-between w-full">
                            <span className="font-medium">{label}</span>
                            <span style={{ color: data.datasets[0].backgroundColor[index] }}>
                                {data.datasets[0].data[index]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
