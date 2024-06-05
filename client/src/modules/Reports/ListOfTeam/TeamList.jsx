import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteIcon from "@/assets/icons/delete.svg";
import SearchInput from "@/components/search-input";

function TeamList() {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isCreateNewList, setisCreateNewList] = useState(true);
    const [isCreateQuestionList, setisCreateQuestionList] = useState(true);



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
            header: "SI No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "date",
            header: "Date Of Creation",
        },
        {
            accessorKey: "department",
            header: "Number Of People",
        },
        {
            accessorKey: "department",
            header: "People",
        },
        {
            accessorKey: "department",
            header: "Question Set",
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
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => {
                const reminderId = row.original.id; // Adjust based on your data structure
                const [isOpen, setIsOpen] = useState(false);

                return (
                    <div className="flex justify-center">
                        <>
                            <Button
                                variant="primary"
                                className="bg-customBlue text-darkBlue rounded-3xl"
                                onClick={() => setIsOpen(true)}
                            >
                                View
                            </Button>
                            {/* <ModelCreate
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                rowData={row.original}
                            /> */}
                        </>
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
            header: "Name",
        },
        {
            accessorKey: "date",
            header: "Number Of Questions",
        },
        {
            accessorKey: "department",
            header: "List",
        },
        {
            accessorKey: "department",
            header: "Frequency",
        },
        {
            accessorKey: "department",
            header: "Question Set",
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
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => {
                const reminderId = row.original.id; // Adjust based on your data structure
                const [isOpen, setIsOpen] = useState(false);

                return (
                    <div className="flex justify-center">
                        <>
                            <Button
                                variant="primary"
                                className="bg-customBlue text-darkBlue rounded-3xl"
                                onClick={() => setIsOpen(true)}
                            >
                                Edit
                            </Button>
                            {/* <ModelCreate
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                rowData={row.original}
                            /> */}
                        </>
                    </div>
                );
            },
        },
    ];



    return (
        <section className="flex flex-col gap-2 px-2">

            <div className="flex  flex-col justify-evenly gap-4 pt-3" >
                <div>
                    <Table
                        heading="All List"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        inputType="search"
                        isCreateNewList={isCreateNewList}

                    />
                </div>
                <div>
                    <Table
                        heading="Question Set"
                        columns={columns1}
                        data={leavesData.hr_complaints}
                        inputType="search"
                        isCreateQuestionList={isCreateQuestionList}

                    />
                </div>
            </div>
        </section>
    );
}

export default TeamList;
