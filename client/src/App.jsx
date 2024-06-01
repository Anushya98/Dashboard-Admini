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
import DocumentPage from "./modules/Training/Document/TrainingDocuments";
import QuizPage from "./modules/Training/Quizzes/QuizTab";
import HrDasboard from "./modules/hr/Dashboard/HrDashboard";
import MailFormats from "./modules/Documents/MailFormat";
import LeadComplaints from "./modules/Lead/complaint/Leadcomplaint";
import LeadSuggestion from "./modules/Lead/Suggestion/LeadSuggesstion";
import LeadFeedback from "./modules/Lead/Feedbacks/LeadFeedback";
import ReportsModelPage from "./modules/Reports/Models/ReportingModel";
import SalesLeadPage from "./modules/Sales/Leads/ActiveLeads";
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
        <Route path="/hr/dashboard" element={<HrDasboard />} />
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
        <Route path="/admin/tasks" element={<TaskDetails />} />
      </Route>
      <Route path="/document" element={<Dashboard />}>
        <Route path="/document/mail" element={<MailFormats />} />
      </Route>
      <Route path="/reporting" element={<Dashboard />}>
        <Route path="/reporting/model" element={<ReportsModelPage />} />
      </Route>
      <Route path="/lead" element={<Dashboard />}>
        <Route path="/lead/feedback" element={<LeadFeedback />} />
        <Route path="/lead/complaint" element={<LeadComplaints />} />
        <Route path="/lead/suggestion" element={<LeadSuggestion />} />
      </Route>
      <Route path="/sales" element={<Dashboard />}>
        <Route path="/sales/leads" element={<SalesLeadPage />} />
      </Route>
      <Route path="/training" element={<Dashboard />}>
        <Route path="/training/documents" element={<DocumentPage />} />
        <Route path="/training/quiz" element={<QuizPage />} />
      </Route>

      <Route path="/trial" element={<Pdfme />} />
    </Routes>
  );
}

export default App;
