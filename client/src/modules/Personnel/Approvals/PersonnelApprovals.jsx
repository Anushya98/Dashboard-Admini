import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";

import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ApproveForm from "./ApprovedForm";
import DetailForm from "./DetailForm";

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
                    <ApproveForm
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
        header: "Employee Name",
    },
    {
        accessorKey: "complaint_id",
        header: "Employee Id ",
    },
    {
        accessorKey: "department",
        header: "Personal Information ",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <>
                    <Button
                        variant="primary"
                        className="bg-white text-darkBlue rounded-3xl border border-darkBlue hover:bg-darkBlue hover:text-white "
                        onClick={() => setIsOpen(true)}
                    >
                        View
                    </Button>
                    <ApproveForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        rowData={row.original}
                    />
                </>
            );
        },
    },
]

function ApprovedStatus() {
    const [leavesData, setLeavesData] = useState([]);
    const [isCsvPage, setisCsvPage] = useState(true);
    const [isNewUserPage, setisNewUserPage] = useState(true);

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

            <div className="flex justify-evenly gap-0 pt-3" >
                <div style={{ width: "60%" }}>
                    <DetailForm
                        isCsvPage={isCsvPage}
                        isNewUserPage={isNewUserPage}
                    />
                </div>
                <div className="col-span-1" >
                    <div style={{ marginBottom: '10px' }}>
                        <Table
                            heading="Personal information"
                            columns={columns1}
                            data={leavesData.hr_complaints}
                            inputType="search"

                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ApprovedStatus;
