import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
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

export default function UploadForm({ isOpen, setIsOpen }) {
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
    const fDate = form.watch("start_date");

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
            cell: ({ row }) => {

                return (

                    <Button
                        variant="primary"
                        className="bg-customBlue text-darkBlue rounded-xl"
                        onClick={() => setIsOpen(true)}
                    >
                        Add
                    </Button>
                );
            },
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
        <Dialog
            open={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <DialogContent
                className="p-0 border-none w-[max-content] max-h-[80vh] overflow-hidden"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-4 bg-darkBlue rounded-lg rounded-b-none flex justify-between items-center">
                    <h3 className="text-white font-medium">Upload New Document</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        <img src={CancelIcon} alt="cancel" className="w-6 h-6" />
                    </Button>
                </div>
                <div className="p-4 overflow-auto max-h-[calc(80vh-64px)]">
                    <Form onSubmit={form.handleSubmit(handleSubmit)} form={form} className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-8">
                            <div className="flex flex-col w-[100%]">
                                <FormField
                                    control={form.control}
                                    name="task_image"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col items-center w-full">
                                                {/* <FormLabel className="min-w-[10rem]">Task Image</FormLabel> */}
                                                <div
                                                    className={`border border-gray-300 rounded px-8 py-8 cursor-pointer w-full h-[150px] ${isDragging ? 'bg-gray-100' : ''}`}
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
                                                                <img src={ImageIcon} alt="image" className="w-12 mt-2" />
                                                                <span>Drag and drop file here or upload</span>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col justify-between items-start gap-8">
                                <FormField
                                    control={form.control}
                                    name="task_name"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabelComponent label="Document Name">
                                                <Input {...field} placeholder="Add Document Name Here" />
                                            </FormLabelComponent>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="reminder_type"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <SelectReminder field={field} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="document_model"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabelComponent label="Document Model">
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex space-y-1 grow"
                                                    >
                                                        <RadioComponent value="tit-bits" label="Tit Bits" />
                                                        <RadioComponent value="doubts" label="Doubts" />
                                                        <RadioComponent value="quiz" label="Quiz" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormLabelComponent>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div style={{ width: '50%' }}>
                                <Table
                                    heading="Employees to be trained"
                                    columns={columns}
                                    data={leavesData.hr_complaints}
                                />
                            </div>
                            <div style={{ width: '50%' }}>
                                <Table
                                    heading="Employees Added"
                                    columns={columns1}
                                    data={leavesData.hr_complaints}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center gap-8 p-4">
                            <Button
                                type="submit"
                                className="bg-darkBlue text-white rounded-3xl border-white hover:bg-white hover:border-darkBlue hover:text-darkBlue "
                                variant="outline">
                                Save
                            </Button>
                            <Button
                                type="button"
                                className="border-darkBlue rounded-3xl text-darkBlue hover:bg-darkBlue hover:border-white hover:text-white"
                                variant="outline"
                            // onClick={() => setIsOpen(false)}
                            >
                                Save As Draft
                            </Button>
                        </div>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
