import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddPersonIcon from "@/assets/icons/addperson.svg";
import TurnLeftIcon from "@/assets/icons/turn-left.svg";
import CircleArrowIcon from "@/assets/icons/refresh.svg";
import TotalEmployeeIcon from "@/assets/icons/Totalemployee.svg";
import PayslipStatus from "./PayslipStatus";
import CreatePayslipForm from "./CreatePayslip";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "complaint_id",
    header: "Employee Id",
  },
  {
    accessorKey: "department",
    header: "Net Salary",
  },
  {
    accessorKey: "status",
    header: "Status",
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
    header: "PaySlip",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button
            variant="outline"
            className="bg-white border-darkBlue rounded-3xl text-darkBlue hover:bg-darkBlue hover:border-white hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            View
          </Button>
          <PayslipStatus
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            rowData={row.original}
          />
        </>
      );
    },
  },
];

function HrDashboard() {
  const [complaintsData, setComplaintsData] = useState([]);
  const [isPayslipPage, setisPayslipPage] = useState(true);

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


  return (
    <section className="flex flex-col gap-4 px-2 mb-4 mt-4">
      <div className="flex w-full justify-between gap-2">
        <CurvedCard
          title="New Employees"
          count={complaintsData.total_employees}
          icon={AddPersonIcon}
          isPayslipPage={true}
          percentageChange={0.05}
          percentageText="10% increase compared to last year"

        />
        <CurvedCard
          title="Total Employees"
          count={complaintsData.total_complaints_count}
          icon={TotalEmployeeIcon}
          isPayslipPage={true}
          percentageChange={0.05}
          percentageText="10% increase compared to last year"
        />
        <CurvedCard
          title="Turn Over Rate"
          count={complaintsData.solved_complaints_count}
          icon={TurnLeftIcon}
          isPayslipPage={true}
          percentageChange={0.05}
          percentageText="10% increase compared to last year"
        />
        <CurvedCard
          title="Employee Engagement"
          count={complaintsData.pending_complaints_count}
          icon={CircleArrowIcon}
          isPayslipPage={true}
          percentageChange={0.05}
          percentageText="10% increase compared to last year"
        />
      </div>

      <div className="flex gap-4">
        <div className="w-[65%]">
          <CreatePayslipForm />
        </div>
        <div className="w-[35%]">
          <Table
            heading="Employment Status"
            columns={columns}
            data={complaintsData.hr_complaints}
          />
        </div>
      </div>
    </section>
  );
}

export default HrDashboard;
