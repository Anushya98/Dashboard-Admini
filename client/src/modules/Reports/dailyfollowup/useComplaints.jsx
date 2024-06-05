import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib/date-format";
import { handleRequest } from "@/lib/services";
import { setUpHeaders } from "@/lib/utils";

export function useComplaints() {
  const [complaintsData, setComplaintsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    {
      accessorKey: "si_no",
      header: "SI.No",
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date of Creation
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
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "no_of_people",
      header: "Number of People",
    },
    {
      accessorKey: "question_set",
      header: "Question Set",
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
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setCurrentRow(complaintsData.hr_complaints[row.index]);
            }}
          >
            view
          </div>
        );
      },
    },
  ];

  const headers = setUpHeaders();

  useEffect(() => {
    const fetchComplaints = async () => {
      await handleRequest(
        "hrcomplaints",
        "GET",
        null,
        null,
        null,
        (response) => {
          setComplaintsData(response.data);
        },
        headers
      );
    };
    fetchComplaints();
  }, []);

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
      headers
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
      headers
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


