import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LeaveStatus from "./LeaveStatus";
import AnnualLeaveIcon from "@/assets/icons/AnnualLeave.svg";
import SickLeaveIcon from "@/assets/icons/sickleave.svg";
import MarriageLeaveIcon from "@/assets/icons/marriageleave.svg";
import OtherLeaveIcon from "@/assets/icons/otherleave.svg";

const columns = [
    {
        accessorKey: "si_no",
        header: "Name",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    //   {
    //     accessorKey: "date",
    //     header: ({ column }) => {
    //       return (
    //         <Button
    //           variant="ghost"
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Date
    //           <ArrowUpDown className="ml-2 h-4 w-4" />
    //         </Button>
    //       );
    //     },
    //     cell: ({ row }) => {
    //       const date = row.getValue("date");
    //       const formattedDate = formatDate(date);
    //       return <div>{formattedDate}</div>;
    //     },
    //   },
    {
        accessorKey: "complaint_id",
        header: "Position",
    },
    {
        accessorKey: "name",
        header: "Leave Type",
    },
    {
        accessorKey: "department",
        header: "From Date",
    },
    {
        accessorKey: "complaint_details",
        header: "To Date",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <Badge
                    className={status === "Responded" ? "badge-success" : "badge-danger"}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Count",
    },
    {
        accessorKey: "action",
        header: "Application",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <>
                    <Button
                        variant="primary"
                        className="bg-white text-darkBlue rounded-3xl"
                        onClick={() => setIsOpen(true)}
                    >
                        View
                    </Button>
                    <LeaveStatus
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        rowData={row.original}
                    />
                </>
            );
        },
    },
];

const columns1 = [
    {
        accessorKey: "name",
        header: "Leave status",
    },
    {
        accessorKey: "name",
        header: " ",
    },
    {
        accessorKey: "name",
        header: " ",
    },
    {
        accessorKey: "name",
        header: "On Leave",
    },
]

const columns2 = [
    {
        accessorKey: "name",
        header: "Important Days",
    },
    {
        accessorKey: "name",
        header: " ",
    },
    {
        accessorKey: "name",
        header: " ",
    },
    {
        accessorKey: "name",
        header: " ",
    },
]
function Leaves() {
    const [leavesData, setLeavesData] = useState([]);
    const [isLeavePage, setIsLeavePage] = useState(true);

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
        <section className="flex flex-col gap-4 px-2">
            <div className="flex w-full justify-between gap-2">
                <CurvedCard
                    title="ANUAL LEAVES"
                    count={leavesData.total_employees}
                    isLeavesPage={true}
                    icon={AnnualLeaveIcon}
                />
                <CurvedCard
                    title="SICK LEAVES"
                    count={leavesData.total_complaints_count}
                    isLeavesPage={true}
                    icon={SickLeaveIcon}
                />
                <CurvedCard
                    title="MARRIAGE LEAVES"
                    count={leavesData.solved_complaints_count}
                    isLeavesPage={true}
                    icon={MarriageLeaveIcon}
                />
                <CurvedCard
                    title="OTHER LEAVES"
                    count={leavesData.pending_complaints_count}
                    isLeavesPage={true}
                    icon={OtherLeaveIcon}
                />
            </div>
            <div className="flex justify-between" style={{ gap: '10px' }}>
                <div style={{ width: "70%" }}>
                    <Table
                        heading="Current Leave Application"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"
                        isLeavePage={isLeavePage}

                    />
                </div>
                <div className="col-span-1" >
                    <div style={{ marginBottom: '10px' }}>
                        <Table
                            // heading="Current Leave Application"
                            columns={columns1}
                            data={leavesData.hr_complaints}
                            inputType="calendar"
                        />
                    </div>
                    <div>
                        <Table
                            // heading="Current Leave Application"
                            columns={columns2}
                            data={leavesData.hr_complaints}
                            inputType="month"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Leaves;
