import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useState } from "react";
import SearchInput from "@/components/search-input";
import Calendar from "./calendar-month";
import CalendarComponent from "./calendar-date";
import { Button } from "@/components/ui/button";
import ApplyLeaveForm from "@/modules/hr/LeaveFile/ApplyLeave";


const fuzzyFilter = (row, columnId, value) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default function DataTable({ columns = [], data = [], heading, inputType, }) {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const applyLeaveButton = inputType === 'search' && (
    <>
      <Button
        variant="primary"
        className="bg-white text-darkBlue rounded-3xl"
        onClick={() => setIsOpen(true)}
      >
        + Apply Leave
      </Button>
      <ApplyLeaveForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);

  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
      globalFilter,
    },
  });

  return (
    <section className="border bg-white rounded-2xl">
      <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">{heading}</p>
        <div className="flex gap-10">
          {applyLeaveButton}
          {inputType === "search" && (
            <SearchInput value={globalFilter ?? ""} onSearch={(value) => setGlobalFilter(String(value))} />
          )}
        </div>
        {inputType === "calendar" && (
          <CalendarComponent
            onChange={(selectedDate) => {
              console.log("Selected date:", selectedDate);
              selectedDate = { selectedDate } // Pass selected date value
              // onDateChange={handleDateChange} // Pass handleDateChange function
            }}
          />
        )}
        {inputType === "month" && (
          <Calendar
            selectedMonth={selectedMonth} // Pass selected month value
            onMonthChange={handleMonthChange} // Pass handleMonthChange function
          />
        )}
      </div>
      <Table className="border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-customBlue">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-darkBlue">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-2 px-[2rem]">
        <p className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
