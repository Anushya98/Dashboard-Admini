import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CancelIcon from "@/assets/icons/cancel.svg"
import NotificationIcon from "@/assets/icons/Notification.svg"
import ExpandIcon from "@/assets/icons/Expanding.svg"



function SalesLeadPage() {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isLeadPage, setisLeadPage] = useState(true);


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
            header: "SI.No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "complaint_id",
            header: "Name",
        },
        {
            accessorKey: "name",
            header: "Company Name",
        },
        {
            accessorKey: "department",
            header: "Mobile Number",
        },
        {
            accessorKey: "complaint_details",
            header: "Email ID",
        },
        {
            accessorKey: "complaint_details",
            header: "Address",
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


                return (
                    <div className="flex justify-center">
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
                        heading="Active Lead"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"
                        isLeadPage={isLeadPage}

                    />
                </div>
            </div>
        </section>
    );
}

export default SalesLeadPage;
