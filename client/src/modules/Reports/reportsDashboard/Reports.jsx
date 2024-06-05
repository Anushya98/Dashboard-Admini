import { useEffect, useState } from "react";
import { commonAPI } from "@/lib/services";
import { Badge } from "@/components/ui/badge";
import Table from "@/components/table";
import CurvedCard from "@/components/curved-card";
import BarComponent from "@/components/ui/bar";
import DoughnutComponent from "@/components/donut";
import Sales from "@/assets/icons/customer-sales.svg"
import Purchase from "@/assets/icons/purchase.svg"
import Returns from "@/assets/icons/returnsmajor.svg"
import Time from "@/assets/icons/time.svg"
import { Button } from "@/components/ui/button";
import CalendarComponent from "@/components/calendar-date";
import BestSellingProductImage from "@/assets/icons/product.png"


export default function ReportsPage() {

  const [complaintsData, setComplaintsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const loginToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${loginToken}`,
        };
        const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
        setComplaintsData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchComplaints();
  }, []);

  const columns = [
    {
      accessorKey: "si_no",
      header: "Name",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },

    {
      accessorKey: "complaint_id",
      header: "Product_Id",
    },
    {
      accessorKey: "name",
      header: "Item Solid",
    },
    {
      accessorKey: "department",
      header: "Total sales",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge className={status === "Responded" ? "badge-success" : "badge-danger"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "complaint_details",
      header: "price",
    },
    {
      accessorKey: "",
      header: "Status",
    },
  ];
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date: ", date);
  };

  return (
    <section className="flex flex-col gap-4 px-2 mb-8 mt-4">
      <div className="bg-customBlue border border-darkBlue p-4 rounded rounded-2xl">
        <div className="flex justify-end">
          <CalendarComponent
            onChange={handleDateChange} />
        </div>
        <div className="flex w-full justify-between gap-2">
          <CurvedCard
            icon={Sales}
            title="SALES"
            count={complaintsData.total_employees}
            isComplaintPage={true}
            previous={2}
            percentageChanges={15}
          />
          <CurvedCard
            icon={Purchase}
            title="PURCHASE"
            count={complaintsData.total_complaints_count}
            isComplaintPage={true}
            previous={2}
            percentageChanges={15}
          />
          <CurvedCard
            icon={Returns}
            title="RETURNS"
            count={complaintsData.solved_complaints_count}
            isComplaintPage={true}
            previous={2}
            percentageChanges={15}
          />
          <CurvedCard
            icon={Time}
            title="AVERAGE SALES TIME"
            count={complaintsData.solved_complaints_count}
            isComplaintPage={true}
            previous={2}
            percentageChanges={15}
          />
        </div>
      </div>
      <div className="flex gap-4 pt-3">
        <div className="flex flex-col gap-4 mb-2 w-[50%]">
          <div >
            <BarComponent
              label=" Sales Figure "
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-[50%] ">
              <DoughnutComponent
                label=" Earning Reports" />
            </div>
            <section className="border bg-white rounded-2xl w-[50%]">
              <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
                <p className="text-white font-medium">Best Selling Product</p>
              </div>
              <div className="p-4">
                <img src={BestSellingProductImage} alt="Best Selling Product" className="w-full h-auto" />
                <div className="flex justify-between mt-2">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">25</h3>
                    <p>sold</p>
                  </div>
                  <div className="border-l-2 border-gray-400 pl-4 pr-4"></div> {/* Vertical line */}
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">65</h3>
                    <p>Stock</p>
                  </div>
                  <div className="border-l-2 border-gray-400 pl-4 pr-4"></div> {/* Vertical line */}
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Rs 250000</h3>
                    <p>price</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>


        <div className="w-[50%] min-h-[100vh]">
          <Table
            heading="Top Selling Product"
            inputType="search"
            className="grow"
            columns={columns}
            data={complaintsData.hr_complaints}
          />
        </div>

      </div>

    </section>
  );
}