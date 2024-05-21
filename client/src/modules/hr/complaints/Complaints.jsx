import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date-format";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      const id = row.getValue("complaint_id");
      return <div onClick={() => console.log(id)}>hello</div>;
    },
  },
];

function Complaints() {
  const [complaintsData, setComplaintsData] = useState([]);

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
    <section className="flex flex-col gap-4 px-2">
      <div className="flex w-full justify-between gap-2">
        <CurvedCard
          title="Total Employees"
          count={complaintsData.total_employees}
        />
        <CurvedCard
          title="Total Complaints"
          count={complaintsData.total_complaints_count}
        />
        <CurvedCard
          title="Complaints Resolved"
          count={complaintsData.solved_complaints_count}
        />
        <CurvedCard
          title="Pending Complaints"
          count={complaintsData.pending_complaints_count}
        />
      </div>
      <Table
        heading="Employee Feedback"
        columns={columns}
        data={complaintsData.hr_complaints}
      />
    </section>
  );
}

export default Complaints;
