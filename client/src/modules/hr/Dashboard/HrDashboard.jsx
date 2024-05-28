import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date-format";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddPersonIcon from "@/assets/icons/addperson.svg";
import TurnLeftIcon from "@/assets/icons/turn-left.svg";
import CircleArrowIcon from "@/assets/icons/refresh.svg";
import TotalEmployeeIcon from "@/assets/icons/Totalemployee.svg";
import BarComponent from "@/components/ui/bar";
import DoughnutComponent from "@/components/donut";
import AnnouncementTable from "@/components/annoucementtable";
import SearchInput from "@/components/search-input";
import { Calendar } from "@/components/ui/calendar";

const columns = [
    {
        accessorKey: "si_no",
        header: "Name",
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
                    Joining Date
                    {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
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
        header: "Job Title",
    },
    {
        accessorKey: "name",
        header: "Team",
    },
    {
        accessorKey: "department",
        header: "Salary",
    },
    {
        accessorKey: "status",
        header: "Performance",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <Badge className={status === "Responded" ? "badge-success" : "badge-danger"}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "complaint_details",
        header: "Status",
    },
];

function HrDashboard() {
    const [complaintsData, setComplaintsData] = useState([]);
    const [isDashboardPage, setIsDashboardPage] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const loginToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${loginToken}`,
                };
                const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
                setComplaintsData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchComplaints();
    }, []);

    const announcements = [
        { heading: "New Policy Update", description: "We have updated our leave policy. Please review the details in the HR portal.", date: "2023-04-11" },
        { heading: "Office Renovation", description: "The office will be undergoing renovation from next week. Some sections will be closed.", date: "2023-05-23" },
        // ... other announcements
    ];

    const scheduleData = [
        { time: "9:00 AM - 10:00 AM", title: "Meeting with John", venue: "Conference Room A" },
        { time: "11:00 AM - 12:00 PM", title: "Project Update", venue: "Conference Room B" },
        { time: "1:00 PM - 2:00 PM", title: "Lunch with Clients", venue: "Restaurant X" },
        { time: "3:00 PM - 4:00 PM", title: "Team Discussion", venue: "Room 201" },
    ];

    return (
        <section className="flex gap-4 px-2">
            <div className="flex flex-col gap-4 w-[70%]">
                <div className="flex gap-2">
                    <CurvedCard
                        title="New Employees"
                        count={complaintsData.total_employees}
                        icon={AddPersonIcon}
                        isDashboardPage={true}
                        percentageChange={0.05}
                        percentageText="10% increase compared to last year"
                    />
                    <CurvedCard
                        title="Total Employees"
                        count={complaintsData.total_complaints_count}
                        icon={TotalEmployeeIcon}
                        isDashboardPage={true}
                        percentageChange={0.05}
                        percentageText="10% increase compared to last year"
                    />
                    <CurvedCard
                        title="Turn Over Rate"
                        count={complaintsData.solved_complaints_count}
                        icon={TurnLeftIcon}
                        isDashboardPage={true}
                        percentageChange={0.05}
                        percentageText="10% increase compared to last year"
                    />
                    <CurvedCard
                        title="Employee Engagement"
                        count={complaintsData.pending_complaints_count}
                        icon={CircleArrowIcon}
                        isDashboardPage={true}
                        percentageChange={0.05}
                        percentageText="10% increase compared to last year"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-[50%]">
                        <BarComponent />
                    </div>
                    <div className="w-[50%]">
                        <DoughnutComponent />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-[70%]">
                        <Table
                            heading="Employment Status"
                            columns={columns}
                            data={complaintsData.hr_complaints}
                        />
                    </div>
                    <div className="w-[30%]">
                        <AnnouncementTable announcements={announcements} />
                    </div>
                </div>
            </div>
            <div className="w-[30%] py-3 px-4">
                <section className="border bg-white rounded-2xl min-h-[100vh]">
                    <div className="flex items-center justify-between py-3 px-[2rem] rounded-2xl rounded-b-none border-b border-gray-300">
                        <p className="font-medium">Schedule</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <Calendar isDashboardPage={true} />
                            <div>
                                <SearchInput />
                            </div>
                        </div>
                        <div className="flex mt-4 items-center justify-between py-3 px-[2rem] rounded-b-none border-t border-b border-gray-300">
                            <p className="font-medium">Todays Schedule</p>
                        </div>
                        <div className="px-8 py-4">
                            {scheduleData.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="mb-2 flex items-center gap-4">
                                        <p className="text-sm font-medium">{item.time}</p>
                                        <div className="flex-grow border-b border-darkBlue"></div>
                                    </div>
                                    {/* <div className="flex items-center"> */}

                                    {/* </div> */}
                                    <div key={index} className="p-4 bg-customBlue rounded-md border border-darkBlue">
                                        <p className="text-lg">{item.title}</p>
                                        <p className="text-sm text-gray-600">{item.venue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default HrDashboard;
