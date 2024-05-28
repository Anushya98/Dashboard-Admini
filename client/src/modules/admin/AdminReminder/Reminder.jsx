import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";

import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CancelIcon from "@/assets/icons/cancel.svg"
import NotificationIcon from "@/assets/icons/Notification.svg"
import ExpandIcon from "@/assets/icons/Expanding.svg"
import ReminderExpandForm from "./Expanding";
import ReminderForm from "./CreateFile";

const columns = [
    {
        accessorKey: "si_no",
        header: "Name",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "complaint_id",
        header: "Reminder Name",
    },
    {
        accessorKey: "name",
        header: " Type",
    },
    {
        accessorKey: "department",
        header: "From Person",
    },
    {
        accessorKey: "complaint_details",
        header: "To Person",
    },
    {
        accessorKey: "complaint_details",
        header: "Time",
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
        header: "Action",
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
                    <Button variant="ghost" className="px-2 ">
                        <img src={NotificationIcon} alt="notification" className="w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="px-2 "
                        onClick={() => setIsOpen(true)}
                    >
                        <img src={ExpandIcon} alt="expand" className="w-4" />
                    </Button>
                    <ReminderExpandForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        rowData={row.original} 
                    />
                    <Button variant="ghost" onClick={handleDelete} className="px-2 ">
                        <img src={CancelIcon} alt="cancel" className="w-4" />
                    </Button>
                </div>
            );
        },
    },
];


function ReminderPage() {
    const [leavesData, setLeavesData] = useState([]);

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
                    <Table
                        heading="Your Reminder"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"

                    />
                </div>
                <div className="col-span-1 max-w-[400px]" >
                    <div style={{ marginBottom: '10px' }}>
                        <ReminderForm  />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReminderPage;
