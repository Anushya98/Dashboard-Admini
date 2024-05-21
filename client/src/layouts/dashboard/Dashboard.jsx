import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

function Dashboard() {
  return (
    <section className="flex flex-col min-h-[100dvh]">
      <Topbar />
      <Sidebar>
        <Outlet />
      </Sidebar>
    </section>
  );
}

export default Dashboard;
