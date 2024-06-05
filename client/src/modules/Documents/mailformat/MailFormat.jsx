import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteIcon from "@/assets/icons/delete.svg"
import NotificationIcon from "@/assets/icons/Notification.svg"
import ExpandIcon from "@/assets/icons/Expanding.svg"
import RequestMailForm from "./RequestForm";
import MailFormTemplate from "./FormTemplate";


function MailFormats() {
    const [leavesData, setLeavesData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


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
            header: "Format Number",
        },
        {
            accessorKey: "name",
            header: "Format Name",
        },
        {
            accessorKey: "department",
            header: "Description",
        },
        {
            accessorKey: "complaint_details",
            header: "To Person",
        },
        {
            accessorKey: "complaint_details",
            header: "Used By",
        },
        {
            accessorKey: "complaint_details",
            header: "Approve 1",
        },
        {
            accessorKey: "complaint_details",
            header: "Approve 2",
        },
        {
            accessorKey: "complaint_details",
            header: "Number Of Time Used",
        },
        // {
        //     accessorKey: "status",
        //     header: "Status",
        //     cell: ({ row }) => {
        //         const status = row.getValue("status");
        //         return (
        //             <Badge
        //                 className={status === "Responded" ? "badge-success" : "badge-danger"}
        //             >
        //                 {status}
        //             </Badge>
        //         );
        //     },
        // },
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
            header: "SI.No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },

        {
            accessorKey: "name",
            header: "Format Name",
        },
        {
            accessorKey: "complaint_id",
            header: "Used Date",
        },
        {
            accessorKey: "department",
            header: "Actual Message sent",
        },
        {
            accessorKey: "complaint_details",
            header: "Source",
        },
        {
            accessorKey: "complaint_details",
            header: "Send To",
        },
        {
            accessorKey: "status",
            header: "Review",
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
                            <img src={DeleteIcon} alt="cancel" className="w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const columns2 = [
        {
            accessorKey: "si_no",
            header: "SI.No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },

        {
            accessorKey: "name",
            header: "Format Description",
        },
        {
            accessorKey: "department",
            header: "Recommended By",
        },
        {
            accessorKey: "complaint_details",
            header: "Date",
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
                            className="bg-customBlue text-darkBlue rounded-3xl"
                            onClick={() => setIsOpen(true)}
                        >
                            Approve
                        </Button>

                    </>
                );
            },
        },
    ];

    return (
        <section className="flex flex-col gap-2 px-2 mt-4 mb-4">
            <div className="flex items-center justify-center gap-20 py-3 px-[2rem] bg-darkBlue rounded-2xl ">
                <>                <Button
                    variant="primary"
                    className="bg-white text-darkBlue rounded-3xl"
                    onClick={() => setIsOpen(true)}
                >
                    Request New Format
                </Button>
                    <RequestMailForm isOpen={isOpen} setIsOpen={setIsOpen} />
                </>
                <>
                    <Button
                        variant="primary"
                        className="bg-customBlue text-darkBlue rounded-3xl"
                        onClick={() => setIsOpen(true)}
                    >
                        + Create New Format
                    </Button>
                    <MailFormTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
                </>
            </div>
            <div className="flex flex-col justify-evenly gap-0 pt-3" >
                <div >
                    <Table
                        heading="Available Formats"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"
                    />
                </div>
                <div >
                    <Table
                        heading="My Recent Usage"
                        columns={columns1}
                        data={leavesData.hr_complaints}
                    />
                </div> <div >
                    <Table
                        heading="Format Request"
                        columns={columns2}
                        data={leavesData.hr_complaints}
                    />
                </div>
            </div>
        </section>
    );
}

export default MailFormats;
