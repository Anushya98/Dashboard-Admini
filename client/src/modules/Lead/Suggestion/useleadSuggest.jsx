import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib/date-format";
import { handleRequest } from "@/lib/services";
import useFetch from "@/hooks/useFetch";
import DeleteIcon from "@/assets/icons/delete.svg"
import { commonAPI } from "@/lib/services";

export function useLeadSuggest() {
    // const [complaintsData, setComplaintsData] = useState({});
    const [currentRow, setCurrentRow] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const loginToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${loginToken}`,
                };
                const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
                setComplaintsData(data);
                if (data.hr_complaints.length > 0) {
                    setCurrentRow(data.hr_complaints[0]); // Initialize with the first complaint
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchComplaints();
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
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const date = row.getValue("date");
                const formattedDate = formatDate(date);
                return <div>{formattedDate}</div>;
            },
        },
        {
            accessorKey: "complaint_id",
            header: "Complaint Id",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "department",
            header: "Department",
        },
        {
            accessorKey: "complaint_details",
            header: "Complaint Details",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status");
                return (
                    <Badge variant={status === "Responded" ? "success" : "danger"}>
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
                }
                return (
                    <div className="flex justify-center">
                        {/* <Button
                            variant="ghost"
                            className="px-2 "
                            onClick={() => setSelectedRow(row.original)} // Set the selected row data
                        >
                            <img src={ExpandIcon} alt="expand" className="w-4" />
                        </Button> */}
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
            }
        },
    ];

    const { data, loading } = useFetch("hrcomplaints", true);
    const complaintsData = loading ? [] : data;

    const registerComplaint = async (data) =>
        await handleRequest(
            "hrcomplaints",
            "POST",
            data,
            null,
            null,
            (response) => {
                console.log(response.data);
            },
            true
        );
    // registerComplaint({
    //   name: "akshay",
    //   department: "hr",
    //   complaint_details: "complaint without headers",
    //   status: "pending",
    // });

    const registerResponse = async (data) =>
        await handleRequest(
            `/respondcomplaint/${data.complaint_id}`,
            "POST",
            data,
            null,
            null,
            (response) => {
                console.log(response.data);
            },
            true
        );
    // registerResponse({
    //   complaint_id: "HRCMP_7",response_message:"asdfsdfs asdfsdf"
    // });

    return {
        columns,
        isOpen,
        setIsOpen,
        complaintsData,
        currentRow,
    };
}
