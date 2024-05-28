import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormControl, FormItem, FormField, FormLabel } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import { Textarea } from "@/components/ui/textarea";
import Table from "@/components/table";
import ImageIcon from "@/assets/icons/image.svg";
import CancelIcon from "@/assets/icons/cancel.svg";
import { commonAPI } from "@/lib/services";
import {
    CalendarComponent,
    FormLabelComponent,
    SelectComponent,
    Header,
    LeaveTypeRadio,
    RadioComponent,
    SelectReminder,
    SelectLevel,
} from "@/modules/hr/LeaveFile/components.jsx";

const defaultValues = {
    task_image: [],
    task_name: "",
    reminder_type: "",
    document_model: "",
    start_date: null,
    end_date: null,
};

export default function CreateQuiz({ isOpen, setIsOpen }) {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [allSelected, setAllSelected] = useState(false);

    // Fetch leaves data
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const loginToken = localStorage.getItem("accessToken");
                const headers = { Authorization: `Bearer ${loginToken}` };
                const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
                setLeavesData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchLeaves();
    }, []);

    const form = useForm({ defaultValues, mode: "onChange" });

    const handleFileUpload = (files) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const handleDeleteFile = (fileToDelete) => {
        setSelectedFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
    };

    const handleRowSelect = (row) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(row)) {
                return prevSelectedRows.filter(selectedRow => selectedRow !== row);
            } else {
                return [...prevSelectedRows, row];
            }
        });
    };

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedRows([]);
        } else {
            setSelectedRows(leavesData.hr_complaints.map(row => row));
        }
        setAllSelected(!allSelected);
    };

    const columns = [
        {
            accessorKey: "si_no",
            accessorKey: "select",
            header: (
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row.original)}
                    onChange={() => handleRowSelect(row.original)}
                />
            ),
        },
        {
            accessorKey: "complaint_id",
            header: "Department",
            cell: ({ row }) => (
                <SelectComponent field={row.original} showLabel={false} />
            ),
        },
        {
            accessorKey: "name",
            header: "Level",
            cell: ({ row }) => (
                <SelectLevel field={row.original} showLabel={false} options={[
                    { value: "level_1", label: "Level 1" },
                    { value: "level_2", label: "Level 2" },
                    { value: "level_3", label: "Level 3" }
                ]} />
            ),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <Button
                    variant="primary"
                    className="bg-customBlue text-darkBlue rounded-xl"
                    onClick={() => setIsOpen(true)}
                >
                    Add
                </Button>
            ),
        },
    ];

    const columns1 = [
        {
            accessorKey: "si_no",
            header: "SI No",
            cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        {
            accessorKey: "complaint_id",
            header: "Department",
        },
        {
            accessorKey: "name",
            header: "Number Of Employees",
        },
        {
            accessorKey: "department",
            header: "Employee Type",
        },
    ];

    const handleSubmit = (data) => {
        const formattedStartDate = hyphenDate(data.start_date);
        const formattedEndDate = hyphenDate(data.end_date);
        const updatedData = { ...data, start_date: formattedStartDate, end_date: formattedEndDate };
        console.log(updatedData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent
                className="p-0 border-none min-w-[600px]"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-4 bg-darkBlue rounded-lg rounded-b-none flex justify-between items-center">
                    <h3 className="text-white font-medium">Quiz Name</h3>
                </div>
                <Form onSubmit={form.handleSubmit(handleSubmit)} form={form} className="flex flex-col items-center gap-4 p-4">
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="task_image"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem className="flex gap-4 items-center">
                                    <FormLabel >Upload Document</FormLabel>
                                    <div
                                        className={`border border-gray-300 rounded px-4 py-4 cursor-pointer min-w-[50%] ${isDragging ? 'bg-gray-100' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="task_image"
                                            accept="*"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                            multiple
                                        />
                                        <label htmlFor="task_image" className="file-input-label flex flex-col items-center justify-center h-full">
                                            {selectedFiles.length > 0 ? (
                                                <ul className="w-full">
                                                    {selectedFiles.map((file, index) => (
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span>{file.name}</span>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file)}>
                                                                <img src={CancelIcon} alt="delete" className="w-4" />
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <>
                                                    <img src={ImageIcon} alt="image" className="w-6 mt-2" />
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="questions_required"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem className="flex gap-4 items-center">
                                    <FormLabel >Number Of Questions Required</FormLabel>
                                    <Input {...field} placeholder="Add Number of Questions Here" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="topic_name"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem className="flex gap-4 items-center">
                                    <FormLabel >More Focus On Topics</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <Input {...field} placeholder="Enter Topic Name Here" />
                                        <Input {...field} placeholder="Enter Topic Name Here" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="google_topics_name"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem className="flex   items-center gap-4">
                                    <FormLabel>Add Questions Topics From Google</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <Input {...field} placeholder="Enter Topic Name Here" />
                                        <Input {...field} placeholder="Enter Topic Name Here" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="document_model"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem className="flex gap-4">
                                    <FormLabel className="min-w-[10rem]">Allocated To</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-y-1"
                                        >
                                            <RadioComponent value="department" label="Department" />
                                            <RadioComponent value="level" label="Level" />
                                            <RadioComponent value="mandatory" label="Mandatory" />
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-center gap-8 p-4">
                        <Button
                            type="submit"
                            className="bg-darkBlue text-white rounded-3xl border-white hover:bg-white hover:border-darkBlue hover:text-darkBlue"
                            variant="outline"
                        >
                            Ok
                        </Button>
                        <Button
                            type="button"
                            className="border-darkBlue rounded-3xl text-darkBlue hover:bg-darkBlue hover:border-white hover:text-white"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
