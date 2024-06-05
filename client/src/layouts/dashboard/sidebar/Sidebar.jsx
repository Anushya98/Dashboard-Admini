import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import ModuleIcon from "@/assets/icons/hr.svg";
import LeadIcon from "@/assets/icons/lead.svg";
import DocumentIcon from "@/assets/icons/document.svg";
import AdminIcon from "@/assets/icons/day2day.svg";
import MarketingIcon from "@/assets/icons/marketing.svg";
import SalesIcon from "@/assets/icons/sales.svg";
import TrainingIcon from "@/assets/icons/training.svg";
import ReportIcon from "@/assets/icons/reporting.svg";
import PersonnelIcon from "@/assets/icons/personnel.svg"



function Sidebar({ children }) {
  const activePage = useStore((state) => state.activePage);
  const setActivePage = useStore((state) => state.setActivePage);
  const [currentUrl, setCurrentUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUrl(window.location.href.slice(22));
  }, []);

  return (
    <Tabs defaultValue={currentUrl} className="flex gap-4 grow">
      <TabsList className="flex flex-col min-w-[240px] bg-white shadow-lg">
        <div className="flex items-center p-4 pb-0">
          <img src={DashboardIcon} alt=" " className="w-4" />
          <TabsTrigger
            value="dashboard"
            onClick={() => {
              setActivePage("dashboard");
              navigate("/dashboard");
            }}
            className="text-sm font-semibold hover:text-darkBlue"
          >
            Dashboard
          </TabsTrigger>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="hr-module">
            <div className="flex items-center p-4 pb-0">
              <img src={ModuleIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">

                HR Module
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="hr/dashboard"
                  onClick={() => {
                    setActivePage("hr/dashboard");
                    navigate("/hr/dashboard");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Dashboard
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/payslip"
                  onClick={() => {
                    setActivePage("hr/payslip");
                    navigate("/hr/payslip");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Payslip
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/leave"
                  onClick={() => {
                    setActivePage("hr/leave");
                    navigate("/hr/leave");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Leave
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/feedback"
                  onClick={() => {
                    setActivePage("hr/feedback");
                    navigate("/hr/feedback");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Feedback
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/complaints"
                  onClick={() => {
                    setActivePage("hr/complaints");
                    navigate("/hr/complaints");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Complaints
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/suggestion"
                  onClick={() => {
                    setActivePage("hr/suggestion");
                    navigate("/hr/suggestion");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Suggestions
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/welfare"
                  onClick={() => {
                    setActivePage("hr/welfare");
                    navigate("/hr/welfare");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Welfare
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/bills"
                  onClick={() => {
                    setActivePage("hr/bills");
                    navigate("/hr/bills");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Bills
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="hr/settings"
                  onClick={() => {
                    setActivePage("hr/settings");
                    navigate("/hr/settings");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Settings
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                {/* Add more sub-items here */}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>

          <AccordionItem value="lead-management">
            <div className="flex items-center p-4 pb-0">
              <img src={LeadIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Lead Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="lead/dashboard"
                  onClick={() => {
                    setActivePage("lead/dashboard");
                    navigate("/lead/dashboard");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Dashboard
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/leads"
                  onClick={() => {
                    setActivePage("lead/leads");
                    navigate("/lead/leads");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Leads
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/follow-up"
                  onClick={() => {
                    setActivePage("lead/follow-up");
                    navigate("/lead/follow-up");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Follow-Up
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/reminder"
                  onClick={() => {
                    setActivePage("lead/reminder");
                    navigate("/lead/reminder");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Reminder To Call
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/feedback"
                  onClick={() => {
                    setActivePage("lead/feedback");
                    navigate("/lead/feedback");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Feedback
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/complaint"
                  onClick={() => {
                    setActivePage("lead/complaint");
                    navigate("/lead/complaint");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Complaint
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/suggestion"
                  onClick={() => {
                    setActivePage("lead/suggestion");
                    navigate("/lead/suggestion");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Suggestion
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/quotation"
                  onClick={() => {
                    setActivePage("lead/quotation");
                    navigate("/lead/quotation");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Quotation
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lead/invoice"
                  onClick={() => {
                    setActivePage("lead/invoice");
                    navigate("/lead/invoice");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Invoice
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>

              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="marketing">
            <div className="flex items-center p-4 pb-0">
              <img src={MarketingIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Marketing Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="marketing/posting"
                  onClick={() => {
                    setActivePage("marketing/posting");
                    navigate("/marketing/posting");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Posting
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/scheduling"
                  onClick={() => {
                    setActivePage("marketing/scheduling");
                    navigate("/marketing/scheduling");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Scheduling
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/follow-up"
                  onClick={() => {
                    setActivePage("marketing/follow-up");
                    navigate("/marketing/follow-up");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Follow-Up
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/cutomization"
                  onClick={() => {
                    setActivePage("marketing/cutomization");
                    navigate("/marketing/cutomization");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Customize Image To Call
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/designs"
                  onClick={() => {
                    setActivePage("marketing/designs");
                    navigate("/marketing/designs");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Designs
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/create-designs"
                  onClick={() => {
                    setActivePage("marketing/create-designs");
                    navigate("/marketing/create-designs");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Create Designs
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing/analysis"
                  onClick={() => {
                    setActivePage("marketing/analysis");
                    navigate("/marketing/analysis");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Analysis
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="sales-team">
            <div className="flex items-center p-4 pb-0">
              <img src={SalesIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Sales Team Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="sales/attendance"
                  onClick={() => {
                    setActivePage("sales/attendance");
                    navigate("/sales/attendance");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Attendance
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sales/monitoring"
                  onClick={() => {
                    setActivePage("sales/monitoring");
                    navigate("/sales/monitoring");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Monitoring
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sales/leads"
                  onClick={() => {
                    setActivePage("sales/leads");
                    navigate("/sales/leads");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Leads
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sales/workflow"
                  onClick={() => {
                    setActivePage("sales/workflow");
                    navigate("/sales/workflow");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Workflow
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sales/complaints"
                  onClick={() => {
                    setActivePage("sales/complaints");
                    navigate("/sales/complaints");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Complaints
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="sales/suggestion"
                  onClick={() => {
                    setActivePage("sales/suggestion");
                    navigate("/sales/suggestion");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Suggestion
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sales/feedback"
                  onClick={() => {
                    setActivePage("sales/feedback");
                    navigate("/sales/feedback");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Feedback
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="reporting">
            <div className="flex items-center p-4 pb-0">
              <img src={ReportIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Reporting Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="reporting/reports"
                  onClick={() => {
                    setActivePage("reporting/reports");
                    navigate("/reporting/reports");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Reports
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="reporting/daily-followup"
                  onClick={() => {
                    setActivePage("reporting/daily-followup");
                    navigate("/reporting/daily-followup");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Daily Follow-Up
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="reporting/team-list"
                  onClick={() => {
                    setActivePage("reporting/team-list");
                    navigate("/reporting/team-list");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    List Of Team
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="reporting/questions"
                  onClick={() => {
                    setActivePage("reporting/questions");
                    navigate("/reporting/questions");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Random Questions
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="reporting/model"
                  onClick={() => {
                    setActivePage("reporting/model");
                    navigate("/reporting/model");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Model Reports
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="training">
            <div className="flex items-center p-4 pb-0">
              <img src={TrainingIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Training Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="training/documents"
                  onClick={() => {
                    setActivePage("training/documents");
                    navigate("/training/documents");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Documents
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="training/daily-dose"
                  onClick={() => {
                    setActivePage("training/daily-dose");
                    navigate("/training/daily-dose");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Daily-dose
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="training/quiz"
                  onClick={() => {
                    setActivePage("training/quiz");
                    navigate("/training/quiz");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Quizzes
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="training/doubts"
                  onClick={() => {
                    setActivePage("training/doubts");
                    navigate("/training/doubts");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Doubts
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="training/rewards"
                  onClick={() => {
                    setActivePage("training/rewards");
                    navigate("/training/rewards");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Rewards
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="training/departments"
                  onClick={() => {
                    setActivePage("training/departments");
                    navigate("/training/departments");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Departments
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="document">
            <div className="flex items-center p-4 pb-0">
              <img src={DocumentIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Document Management
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="document/approved"
                  onClick={() => {
                    setActivePage("document/approved");
                    navigate("/document/approved");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Approved Forms
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="document/mail"
                  onClick={() => {
                    setActivePage("document/mail");
                    navigate("/document/mail");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Mail Formats
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="document/letter"
                  onClick={() => {
                    setActivePage("document/letter");
                    navigate("/document/letter");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    All Letters
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="document/form"
                  onClick={() => {
                    setActivePage("document/form");
                    navigate("/document/form");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    All Forms
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="personnel">
            <div className="flex items-center p-4 pb-0">
              <img src={PersonnelIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Personnel/Departments
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="personnel/approved"
                  onClick={() => {
                    setActivePage("personnel/approved");
                    navigate("/personnel/approved");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Approved Forms
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="personnel/mail"
                  onClick={() => {
                    setActivePage("personnel/mail");
                    navigate("/personnel/mail");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Mail Formats
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="personnel/letter"
                  onClick={() => {
                    setActivePage("personnel/letter");
                    navigate("/personnel/letter");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    All Letters
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="personnel/form"
                  onClick={() => {
                    setActivePage("personnel/form");
                    navigate("/personnel/form");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    All Forms
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="admin">
            <div className="flex items-center p-4 pb-0">
              <img src={AdminIcon} alt=" " className="w-4" />
              <AccordionTrigger className="flex items-center py-1 px-3 text-sm font-semibold hover:text-darkBlue">
                {/* <FaUser className="mr-2" /> */}
                Day to Day Admin
              </AccordionTrigger>
            </div>
            <AccordionContent className="flex flex-col pl-10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-4 w-1 bg-gray-200"></div>
                <TabsTrigger
                  value="admin/meeting"
                  onClick={() => {
                    setActivePage("admin/meeting");
                    navigate("/admin/meeting");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Meeting Schedule
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="admin/groups"
                  onClick={() => {
                    setActivePage("admin/groups");
                    navigate("/admin/groups");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Groups
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="admin/d-approval"
                  onClick={() => {
                    setActivePage("admin/d-approval");
                    navigate("/admin/d-approval");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaFileAlt className="mr-2" /> */}
                  <span className="relative">
                    Department Approval
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="admin/reminder"
                  onClick={() => {
                    setActivePage("admin/reminder");
                    navigate("/admin/reminder");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Reminder
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="admin/tasks"
                  onClick={() => {
                    setActivePage("admin/tasks");
                    navigate("/admin/tasks");
                  }}
                  className="relative flex items-center pl-4 py-2 hover:bg-gray-100 hover:text-darkBlue"
                >
                  {/* <FaCommentDots className="mr-2" /> */}
                  <span className="relative">
                    Tasks
                    <span className="absolute left-[-44px] top-1/2 transform -translate-y-1/2 w-8 h-px bg-gray-200"></span>
                  </span>
                </TabsTrigger>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsList>
      <TabsContent value={activePage} className="grow">
        {children}
      </TabsContent>
    </Tabs>
  );
}

export default Sidebar;
