import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import Table from "@/components/table";
import { commonAPI } from "@/lib/services";
import { Button } from "@/components/ui/button";

const columns = [
  {
    accessorKey: "name",
    header: "Earnings",
  },
  {
    accessorKey: "complaint_id",
    header: "Amount",
  },
  {
    accessorKey: "department",
    header: "Deduction",
  },
  {
    accessorKey: "complaint_details",
    header: "Amount",
  },
];

export default function PayslipStatus({ isOpen, setIsOpen, isPayslipPage }) {
  const { handleSubmit, formState } = useForm({ mode: "onChange" });
  const [leavesData, setLeavesData] = useState([]);

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

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="p-0 border-none min-w-[800px]" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="p-4 bg-darkBlue rounded-lg rounded-b-none">
          <div className="flex items-center ">
            <h3>LOGO</h3>
            <div className="text-center" style={{ marginLeft: '30%' }}>
              <h3 className="text-white font-medium">Payslip</h3>
              <p className="text-white font-medium">Company Name</p>
              <p className="text-white text-sm">1234 Address St, City, Country</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4">
              <p className="font-semibold">Employee ID:</p>
              <p>6565</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold">Employee Name:</p>
              <p>Aruna</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold">Department:</p>
              <p>Quality</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold">Designation:</p>
              <p>Front End developer</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold">Bank ACC number:</p>
              <p>122355656566</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold">PAN Number:</p>
              <p>689898955</p>
            </div>
          </div>
          <Table
            columns={columns}
            data={leavesData.hr_complaints}
            showControlHeader={false}
            isPayslipPage={isPayslipPage} // Pass the isPayslipPage prop
          />
          <div className="flex justify-center gap-8">
            <Button type="submit" className="bg-darkBlue text-white hover:bg-transparent hover:border-darkBlue hover:text-darkBlue rounded-3xl" variant="outline" disabled={!formState.isValid}>
              Send
            </Button>
            <Button type="button" className="border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white rounded-3xl" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
