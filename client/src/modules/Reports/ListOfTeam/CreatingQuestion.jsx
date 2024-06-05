import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import QuestionForm from "./QuestionForm";

function CreateQuestionList() {
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
            header: "Group Name",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "complaint_id",
            header: "Number Of People",
        },
        {
            accessorKey: "name",
            header: "People",
        },
        {
            accessorKey: " ",
            header: "Action",
            cell: ({ row }) => {
                const reminderId = row.original.id; // Adjust based on your data structure
                const [isOpen, setIsOpen] = useState(false);

                return (
                    <Button
                        variant="primary"
                        className="bg-customBlue text-darkBlue rounded-3xl"
                        onClick={() => setIsOpen(true)}
                    >
                        Add
                    </Button>
                );
            },
        },
    ];

    const questionsData = [
        {
            questionNumber: 1,
            question: "What is your name?",
            type: "Text",
            askTime: "2Hrs 30mins 00sec",
            report: "2Hrs 30mins 00sec"
        },
        {
            questionNumber: 2,
            question: "How old are you?",
            type: "Number",
            askTime: "2Hrs 30mins 00sec",
            report: "2Hrs 30mins 00sec"
        },
        {
            questionNumber: 3,
            question: "What is your favorite color?",
            type: "Multiple Choice",
            askTime: "2Hrs 30mins 00sec",
            report: "2Hrs 30mins 00sec"
        }
    ];

    return (
        <section className="flex flex-col gap-2 px-2">
            <div className="flex gap-4 pt-3">
                <div className="flex flex-col gap-4 mb-2 w-[70%]">
                    <div>
                        <QuestionForm />
                    </div>
                    <div>
                        <Table
                            heading="Ask Question To Group"
                            columns={columns}
                            data={leavesData.hr_complaints}
                            inputType="search"
                        />
                    </div>
                </div>
                <div className="w-[30%] min-h-[100vh]">
                    <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none flex justify-between items-center">
                        <h3 className="text-white font-medium">Question Details</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {questionsData.map((question, index) => (
                            <div key={index} className="border-b last:border-none pb-4 mb-4 last:mb-0">
                                <div className="flex justify-between">
                                    <h4 className="font-semibold text-darkBlue">Question Number: {question.questionNumber}</h4>

                                </div>
                                <p className="mt-2">{question.question}</p>
                                <div className="text-darkBlue font-semibold">
                                    <span>Type: {question.type}</span>

                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex  mt-2 text-xs font-semibold gap-4">
                                        <span className="self-end">Ask Time:</span>
                                        <span className="bg-[#90ee9047] px-2 py-1 text-green-600 rounded">{question.askTime}</span>
                                    </div>
                                    <div className="flex mt-2 text-xs font-semibold gap-2">
                                        <span className="self-end">Report Time:</span>
                                        <span className="bg-[#90ee9047] px-2 py-1 text-green-600 rounded">{question.report}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateQuestionList;
