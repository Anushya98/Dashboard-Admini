import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";

import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DeleteIcon from "@/assets/icons/delete.svg"

const columns = [
    {
        accessorKey: "si_no",
        header: "SI No",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },

    {
        accessorKey: "complaint_id",
        header: "Bill No",
    },
    {
        accessorKey: "name",
        header: "Add Description",
    },
    {
        accessorKey: "department",
        header: "Created Date",
    },
    {
        accessorKey: "complaint_details",
        header: "Amount",
    },
    {
        accessorKey: "",
        header: "Approval 1",
    },
    {
        accessorKey: " ",
        header: "Approval 2",
    },
    {
        accessorKey: "status",
        header: "Approval Date",
    },
    {
        accessorKey: "action",
        header: "Amount Approved",
    },
    {
        accessorKey: " ",
        header: "Status",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);
            const reminderId = row.original.id; // Adjust based on your data structure

            const handleDelete = async () => {
                try {
                    const loginToken = localStorage.getItem("accessToken");
                    const headers = {
                        Authorization: `Bearer ${loginToken}`,
                    };
                    await commonAPI(`hrcomplaints/${reminderId}`, "DELETE", {}, headers);
                    setLeavesData((prevData) =>
                        prevData.filter((item) => item.id !== reminderId)
                    );
                } catch (err) {
                    console.log(err.message);
                }
            };

            return (
                <div className="flex justify-center">
                    <>
                        <Button
                            variant="primary"
                            className="bg-white text-darkBlue rounded-3xl border border-darkBlue hover:bg-darkBlue hover:text-white "
                            onClick={() => setIsOpen(true)}
                        >
                            Edit
                        </Button>
                    </>

                    <Button variant="ghost" onClick={handleDelete} className="px-2 ">
                        <img src={DeleteIcon} alt="cancel" className="w-4" />
                    </Button>
                </div>
            );
        },
    },
];

const columns1 = [
    {
        accessorKey: "si_no",
        header: "SI No",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Provision Name ",
    },
    {
        accessorKey: "complaint_details",
        header: "Condition ",
    },
    {
        accessorKey: "complaint_id",
        header: "Due Date ",
    },
    {
        accessorKey: " ",
        header: " Status",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <>
                    <Button
                        variant="primary"
                        className="bg-white text-darkBlue rounded-3xl border border-darkBlue hover:bg-darkBlue hover:text-white "
                        onClick={() => setIsOpen(true)}
                    >
                        Apply
                    </Button>
                </>
            );
        },
    },
]

function WelfarePage() {
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
                <div style={{ width: "100%" }}>
                    <div className="mb-8">
                        <Table
                            heading="Welfare"
                            columns={columns}
                            data={leavesData.hr_complaints}
                        />
                    </div>
                    <div className="mb-8">
                        <Table
                            heading="Eligible Bills Not Applied"
                            columns={columns1}
                            data={leavesData.hr_complaints}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
}

export default WelfarePage;
