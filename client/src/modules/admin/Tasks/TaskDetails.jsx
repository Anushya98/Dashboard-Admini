import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CancelIcon from "@/assets/icons/cancel.svg"
import NotificationIcon from "@/assets/icons/Notification.svg"
import ExpandIcon from "@/assets/icons/Expanding.svg"
import TaskExpandForm from "./TaskExpanding";
import CreateTask from "./CreateTask";


function TaskDetails() {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null); 
    const [isNewTaskPage, setisNewTaskPage] = useState(true);


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
            accessorKey: "",
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
                            onClick={() => setSelectedRow(row.original)} // Set the selected row data
                        >
                            <img src={ExpandIcon} alt="expand" className="w-4" />
                        </Button>
                        {/* <TaskExpandForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        rowData={row.original} // Pass the row data here
                    /> */}
                        <Button variant="ghost" onClick={handleDelete} className="px-2 ">
                            <img src={CancelIcon} alt="cancel" className="w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];



    return (
        <section className="flex flex-col gap-2 px-2">

            <div className="flex justify-evenly gap-0 pt-3" >
                <div style={{ width: selectedRow ? "60%" : "100%" }}>
                    <Table
                        heading="Your Task"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"
                        isNewTaskPage={isNewTaskPage}

                    />
                </div>
                {selectedRow && (
                    <div className="col-span-1 max-w-[40%]">
                        <TaskExpandForm
                            onCancel={() => setSelectedRow(null)}
                            rowData={selectedRow} // Pass the row data here
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default TaskDetails;
