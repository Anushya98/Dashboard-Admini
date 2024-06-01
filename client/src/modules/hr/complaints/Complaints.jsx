import { useComplaints } from "./useComplaints";
import CurvedCard from "@/components/curved-card";
import Table from "@/components/table";
import ComplaintComponent from "@/components/feedback";

function Complaints() {
  const { columns, isOpen, setIsOpen, complaintsData, currentRow } =
    useComplaints();
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
      <div className="flex gap-4">
        <Table
          heading="Employee Feedback"
          className="grow"
          columns={columns}
          data={complaintsData.hr_complaints}
        />
        {isOpen && (
          <ComplaintComponent
            //   className={"w-[90%] mx-auto"}
            title="Customer Feedback"
            value={currentRow?.complaint_details}
            position={"front end dev"}
            name={currentRow.name}
            department={currentRow.department}
            buttons={["apply", "reject", "delay"]}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </section>
  );
}

export default Complaints;
