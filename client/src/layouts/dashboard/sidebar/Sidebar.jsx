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
      <TabsList className="flex flex-col w-[min(25dvw,15rem)] bg-white shadow">
        <TabsTrigger
          value="login"
          onClick={() => {
            setActivePage("login");
            navigate("/login");
          }}
        >
          login
        </TabsTrigger>
        <TabsTrigger
          value="login"
          onClick={() => {
            setActivePage("login");
            navigate("/login");
          }}
        >
          register
        </TabsTrigger>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>acc 1</AccordionTrigger>
            <AccordionContent className="flex flex-col text-center">
              <TabsTrigger
                value="hr/leave"
                onClick={() => {
                  setActivePage("hr/leave");
                  navigate("/hr/leave");
                }}
              >
                leave
              </TabsTrigger>
              <TabsTrigger
                value="org-register"
                onClick={() => {
                  setActivePage("org-register");
                  navigate("/org-register");
                }}
              >
                orgreg
              </TabsTrigger>
              <TabsTrigger
                value="hr/complaints"
                onClick={() => {
                  setActivePage("hr/complaints");
                  navigate("/hr/complaints");
                }}
              >
                complaints
              </TabsTrigger>
              <TabsTrigger
                value="hr/payslip"
                onClick={() => {
                  setActivePage("hr/payslip");
                  navigate("/hr/payslip");
                }}
              >
                Payslip
              </TabsTrigger>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="item-2">
            <AccordionTrigger>acc 2</AccordionTrigger>
            <AccordionContent>
              <TabsTrigger
                value="hr/complaints"
                onClick={() => {
                  setActivePage("hr/complaints");
                  navigate("/hr/complaints");
                }}
              >
                complaints
              </TabsTrigger>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </TabsList>
      <TabsContent value={activePage} className="grow">
        {children}
      </TabsContent>
    </Tabs>
  );
}

export default Sidebar;
