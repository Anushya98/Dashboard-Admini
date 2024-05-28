import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";

import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ExpandIcon from "@/assets/icons/Expanding.svg"
import PieComponent from "@/components/ui/pie";
import BarComponent from "@/components/ui/bar";

const columns = [
    {
        accessorKey: "si_no",
        header: "SI.No",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "complaint_id",
        header: "Quiz Number",
    },
    {
        accessorKey: "name",
        header: "Quiz Name",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "complaint_details",
        header: "Type",
    },
    {
        accessorKey: "status",
        header: "Total Taken",
    },
    {
        accessorKey: "action",
        header: "Source",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <>
                    <Button
                        variant="ghost"
                        className="px-2 "
                        onClick={() => setIsOpen(true)}
                    >
                        <img src={ExpandIcon} alt="expand" className="w-4" />
                    </Button>
                </>
            );
        },
    },
];

const columns1 = [
    {
        accessorKey: "si_no",
        header: "SI.No",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Employee Number",
    },
    {
        accessorKey: "name",
        header: "Employee Name",
    },
    {
        accessorKey: "complaint_id",
        header: "Total Quiz  ",
    },
    {
        accessorKey: "status",
        header: "Total Taken",
    },
    {
        accessorKey: "acomplaint_details",
        header: "Total Marks",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <>
                    <Button
                        variant="ghost"
                        className="px-2 "
                        onClick={() => setIsOpen(true)}
                    >
                        <img src={ExpandIcon} alt="expand" className="w-4" />
                    </Button>
                </>
            );
        },
    },
]

function QuizCharts({ onBack }) {
    const [leavesData, setLeavesData] = useState([]);
    const [isCsvPage, setisCsvPage] = useState(true);
    const [isCreateNewQuiz, setisCreateNewQuiz] = useState(true);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const loginToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${loginToken}`,
                };
                const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
                setLeavesData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchLeaves();
    }, []);

    return (
        <section className="flex flex-col gap-2 px-2">
            <button onClick={onBack}>Back</button>
            <div className="flex justify-evenly gap-2 pt-3" >
                <div style={{ width: "50%" }}>
                    <PieComponent />

                </div>
                <div style={{ width: "50%" }} >
                    <BarComponent />
                </div>
            </div>
            <div className="flex flex-col justify-evenly gap-2 pt-3" >
                <div className="w-[100%]">
                    <Table
                        heading="Quiz"
                        columns={columns}
                        data={leavesData.hr_complaints}
                    // inputType="search"

                    />

                </div>
                <div className="w-[100%]">
                    <div style={{ marginBottom: '10px' }}>
                        <Table
                            heading="Top Leader Board"
                            columns={columns1}
                            data={leavesData.hr_complaints}
                            // inputType="search"
                            isCreateNewQuiz={isCreateNewQuiz}

                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuizCharts;
