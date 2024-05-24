import { Routes, Route } from "react-router-dom";
import Complaints from "@/modules/hr/complaints";
import Leave from "@/modules/leave";
import Login from "@/layouts/auth/login";
import Register from "@/layouts/auth/register";
import OrgReg from "@/layouts/auth/org-registration";
import Dashboard from "@/layouts/dashboard";
import Calendar from "@/modules/leave/Calendar";
import Leaves from "./modules/hr/LeaveFile/Leaves";
import Dialog from "@/modules/hr/LeaveFile/ApplyLeave";
import PayslipFile from "./modules/hr/Payslip/PayslipFile";
import ApprovedStatus from "./modules/Personnel/Approvals/PersonnelApprovals";
import Pdfme from "./PdfGenerator/generation";
import ReminderPage from "./modules/admin/AdminReminder/Reminder";
import DepartmentApprovalPage from "./modules/admin/AdminApproval/ApprovalForm";
import TaskDetails from "./modules/admin/Tasks/TaskDetails";
import WelfarePage from "./modules/hr/Welfare/WelfarePage";
const Home = () => <div>helloworld</div>;

// const Layout = () => {
//   return <div></div>;
// };

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/org-register" element={<OrgReg />} />
      <Route path="/hr" element={<Dashboard />}>
        <Route path="/hr/complaints" element={<Complaints />} />
        <Route path="/hr/leave" element={<Leaves />} />
        <Route path="/hr/payslip" element={<PayslipFile />} />
        <Route path="/hr/welfare" element={<WelfarePage />} />

      </Route>
      <Route path="/personnel" element={<Dashboard />}>
        <Route path="/personnel/approved" element={<ApprovedStatus />} />
        {/* <Route path="/personnel/mail" element={<Leaves />} /> */}

      </Route>
      <Route path="/admin" element={<Dashboard />}>
        <Route path="/admin/d-approval" element={<DepartmentApprovalPage />} />
        <Route path="/admin/reminder" element={<ReminderPage />} />
        <Route path="/admin/tasks" element={<TaskDetails/>} />
        {/* <Route path="/personnel/mail" element={<Leaves />} /> */}

      </Route>
      <Route path="/trial" element={<Pdfme />} />
      {/* <Route path="/trial" element={<Calendar />} /> */}
      {/* <Route path="/trial1" element={<Layout />} /> */}
    </Routes>
  );
}

export default App;
