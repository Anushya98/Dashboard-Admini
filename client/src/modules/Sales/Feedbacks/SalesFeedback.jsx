import { useSalesFeedback } from "./useSalesFeedback";
import { useState } from "react";
import { useEffect } from "react";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import ComplaintComponent from "@/components/feedback";
import FeedBacks from "@/assets/icons/users.svg"
import Positive from "@/assets/icons/feedback.svg"
import Negative from "@/assets/icons/positive feedback.svg"
import UnAttended from "@/assets/icons/rejected-suggestion.svg"

function SalesFeedback() {
    const { columns, complaintsData } = useSalesFeedback();
    const [isOpen, setIsOpen] = useState(true); // Open by default
    const [currentRow, setCurrentRow] = useState(null); // Default to null

    useEffect(() => {
        // Set current row to the first complaint when complaintsData is available
        if (complaintsData?.hr_complaints?.length) {
            setCurrentRow(complaintsData.hr_complaints[0]);
        }
    }, [complaintsData]);

    const handleRowClick = (row) => {
        setCurrentRow(row);
    };

    return (
        <section className="flex flex-col gap-4 px-2 mb-4">
            <div className="flex w-full justify-between gap-2">
                <CurvedCard
                    icon={FeedBacks}
                    title="Total Feedback"
                    count={complaintsData.total_employees}
                    isComplaintPage={true}
                    previous={2}
                    percentageChanges={15}
                />
                <CurvedCard
                    icon={Positive}
                    title="Positive Feedbacks"
                    count={complaintsData.total_complaints_count}
                    isComplaintPage={true}
                    previous={2}
                    percentageChanges={15}
                />
                <CurvedCard
                    icon={Negative}
                    title="Negative Feedbacks"
                    count={complaintsData.solved_complaints_count}
                    isComplaintPage={true}
                    previous={2}
                    percentageChanges={15}
                />
                <CurvedCard
                    icon={UnAttended}
                    title="UnAttended Feedback"
                    count={complaintsData.pending_complaints_count}
                    isComplaintPage={true}
                    previous={2}
                    percentageChanges={15}
                />
            </div>
            <div className="flex gap-4">
                <div className="w-[60%]">
                    {complaintsData && complaintsData.hr_complaints ? ( // Check if complaintsData is available
                        <Table
                            heading="Employee Feedback"
                            className="grow"
                            columns={columns}
                            data={complaintsData.hr_complaints}
                            onRowClick={handleRowClick} // Pass the handler to the Table component
                        />
                    ) : (
                        <p>Loading...</p> // Show loading indicator or handle empty state
                    )}
                </div>
                <div className="w-[40%]">
                    {isOpen && currentRow && ( // Check if currentRow is available
                        <ComplaintComponent
                            heading={"Complaint Details"}
                            title="Customer Feedback"
                            value={currentRow?.complaint_details}
                            position={currentRow?.position}
                            name={currentRow?.name}
                            department={currentRow?.department}
                            buttons={["Send To Department", "No Action Required", "Noted"]}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default SalesFeedback;
