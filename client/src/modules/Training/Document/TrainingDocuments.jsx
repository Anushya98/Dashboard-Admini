import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";

import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import CancelIcon from "@/assets/icons/cancel.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import DocumentIcon from "@/assets/icons/uploaddoc.svg";
import UploadForm from "./UploadForm";

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
        header: "Documents Name",
    },
    {
        accessorKey: "name",
        header: "Description",
    },
    {
        accessorKey: "department",
        header: "Department Allocated",
    },
    {
        accessorKey: "complaint_details",
        header: "Total Pages",
    },
    {
        accessorKey: "status",
        header: "Expected Time To Be Completed",
    },
    {
        accessorKey: " ",
        header: "Action",
        cell: ({ row }) => {
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
                    <Button variant="ghost" onClick={handleDelete} className="px-2">
                        <img src={CancelIcon} alt="cancel" className="w-4" />
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
        accessorKey: "complaint_id",
        header: "Documents Name",
    },
    {
        accessorKey: "name",
        header: "Description",
    },
    {
        accessorKey: "department",
        header: "Uploaded Date",
    },
    {
        accessorKey: "department",
        header: "Department Allocated",
    },
    {
        accessorKey: "complaint_details",
        header: "Total Pages",
    },
    {
        accessorKey: "status",
        header: "Total Question Asked",
    },
    {
        accessorKey: " ",
        header: "Action",
        cell: ({ row }) => {
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
                    <Button variant="ghost" onClick={handleDelete} className="px-2">
                        <img src={DeleteIcon} alt="cancel" className="w-4" />
                    </Button>
                </div>
            );
        },
    },
];

function DocumentPage() {
    const [leavesData, setLeavesData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data

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

    const handleOpenForm = () => {
        setSelectedRowData(null); // Clear any previous selection
        setIsOpen(true); // Open the form
    };

    return (
        <section className="flex flex-col gap-2 px-2">
            <div className="flex flex-col items-center justify-center py-5 px-[2rem] bg-darkBlue rounded-2xl mt-8">

            <Button
                    className="bg-transparent border-none shadow-none py-8 flex flex-col items-center hover:bg-transparent"
                    onClick={handleOpenForm}
                >
                    <img src={DocumentIcon} alt="Document" className="w-10" />
                    <p className="text-white font-medium">Upload New Documents for training</p>
                </Button>
                {isOpen && (
                    <UploadForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        rowData={selectedRowData} // Pass the selected row data if any
                    />
                )}
            </div>
            <div className="flex justify-evenly gap-0 pt-3" >
                <div style={{ width: "100%" }}>
                    <div className="mb-8">
                        <Table
                            heading="Documents Under Training"
                            columns={columns}
                            data={leavesData.hr_complaints}
                        />
                    </div>
                    <div className="mb-8">
                        <Table
                            heading="Documents Trained"
                            columns={columns1}
                            data={leavesData.hr_complaints}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DocumentPage;
