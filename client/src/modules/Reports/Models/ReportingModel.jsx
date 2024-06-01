import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@/assets/icons/delete.svg";

function ReportsModelPage() {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isCreateNewReport, setisCreateNewReport] = useState(true);



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
            accessorKey: "complaint_id",
            header: "Model Number",
        },
        {
            accessorKey: "name",
            header: "Created By",
        },
        {
            accessorKey: "department",
            header: "Reporting Usin It",
        },
        {
            accessorKey: " ",
            header: "Action",
            cell: ({ row }) => {
                const reminderId = row.original.id; // Adjust based on your data structure
                const [isOpen, setIsOpen] = useState(false);
    
    
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
                        <Button variant="ghost" onClick={handleDelete} className="px-2">
                            <img src={DeleteIcon} alt="cancel" className="w-4" />
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
                        heading="Active Lead"
                        columns={columns}
                        data={leavesData.hr_complaints}
                        isCreateNewReport={isCreateNewReport}

                    />
                </div>
            </div>
        </section>
    );
}

export default ReportsModelPage;
