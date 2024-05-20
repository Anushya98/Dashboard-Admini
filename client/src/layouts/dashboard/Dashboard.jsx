import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

function Dashboard() {
  return (
    <section className="flex flex-col gap-2 min-h-[100dvh]">
      <Topbar />
      <Sidebar>
        <Outlet />
      </Sidebar>
    </section>
  );
}

export default Dashboard;
