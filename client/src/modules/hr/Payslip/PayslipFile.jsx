import { useState } from "react";
import PayslipStatusForm from "./PayslipStatus.jsx";
import { Button } from "@/components/ui/button";

export default function PayslipFile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPayslipPage, setIsPayslipPage] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Payslip</Button>
      <PayslipStatusForm isOpen={isOpen} setIsOpen={setIsOpen} isPayslipPage={isPayslipPage} />
    </>
  );
}
