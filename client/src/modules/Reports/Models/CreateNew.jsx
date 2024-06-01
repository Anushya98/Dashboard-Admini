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
    questions: "",
    add_category: "",
};
import { CheckboxComponent } from "@/modules/hr/LeaveFile/components.jsx";

export default function ModelCreate({ isOpen, setIsOpen }) {
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
                className="p-0 border-none w-[60%] gap-0"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="bg-darkBlue rounded-lg rounded-b-none flex justify-between items-center p-2">
                    <h3 className="text-white font-medium">Create New Model</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        <img src={CancelIcon} alt="cancel" className="w-6 h-6" />
                    </Button>
                </div>
                <Form onSubmit={form.handleSubmit(handleSubmit)} form={form} className="flex flex-col p-0">
                    <div className="flex flex-col justify-between">
                        {/* <div className="flex "> */}
                        <div >
                            <h2 className="text-xs text-darkBlue font-semibold mb-4 bg-customBlue p-2  ">
                                Question Type
                            </h2>
                        </div>
                        {/* </div> */}
                        <div className="flex justify-between items-center flex-col items-start p-4 gap-6">
                            <FormField
                                control={form.control}
                                name="questions"
                                rules={{ required: { value: true, message: "This is required*" } }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabelComponent label="Yes or No Question">
                                            <FormControl>
                                                <div className="flex gap-10 ">
                                                    <CheckboxComponent
                                                        value="pie-chart"
                                                        label="Pie Chart"
                                                        checked={field.value.includes('pie-chart')}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...field.value, e.target.value]
                                                                : field.value.filter((val) => val !== e.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                    />
                                                    <CheckboxComponent
                                                        value="actual-values"
                                                        label="Actual Values"
                                                        checked={field.value.includes('actual-values')}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...field.value, e.target.value]
                                                                : field.value.filter((val) => val !== e.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormLabelComponent>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="add_category"
                                rules={{ required: { value: true, message: "This is required*" } }}
                                render={({ field }) => (
                                    <FormItem >
                                        <div className="flex items-center flex-col gap-8">
                                            <FormLabel className="min-w-[10rem]">Add Category</FormLabel>

                                            <FormControl>
                                                <div className="flex gap-10 ">
                                                    <CheckboxComponent
                                                        value="employee-wise"
                                                        label="Employee Wise"
                                                        checked={field.value.includes('employee-wise')}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...field.value, e.target.value]
                                                                : field.value.filter((val) => val !== e.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                    />
                                                    <CheckboxComponent
                                                        value="department-wise"
                                                        label="Department Wise"
                                                        checked={field.value.includes('department-wise')}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...field.value, e.target.value]
                                                                : field.value.filter((val) => val !== e.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                    />
                                                    <CheckboxComponent
                                                        value="state-wise"
                                                        label="State Wise"
                                                        checked={field.value.includes('state-wise')}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...field.value, e.target.value]
                                                                : field.value.filter((val) => val !== e.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                    />

                                                </div>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
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
                            */}
                        </div>
                        <div className="flex flex-col justify-between">
                            {/* <div className="flex "> */}
                            <div >
                                <h2 className="text-xs text-darkBlue font-semibold mb-4 bg-customBlue p-2">
                                    Value Based Question
                                </h2>
                            </div>
                            <div className="flex justify-between items-center flex-col items-start mb-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="chart_type"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <SelectReminder field={field} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="add_category"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem >
                                            <div className="flex items-center flex-col gap-8">
                                                {/* <FormLabel className="min-w-[10rem]">Add Category</FormLabel> */}

                                                <FormControl>
                                                    <div className="flex gap-10 ">
                                                        <div className="flex flex-col gap-4">
                                                            <CheckboxComponent
                                                                value="actual-values"
                                                                label="Actual Values"
                                                                checked={field.value.includes('actual-values')}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...field.value, e.target.value]
                                                                        : field.value.filter((val) => val !== e.target.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                            <CheckboxComponent
                                                                value="top-values"
                                                                label="Top Values"
                                                                checked={field.value.includes('top-values')}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...field.value, e.target.value]
                                                                        : field.value.filter((val) => val !== e.target.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <CheckboxComponent
                                                                value="bottom-values"
                                                                label="Bottom Values"
                                                                checked={field.value.includes('bottom-values')}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...field.value, e.target.value]
                                                                        : field.value.filter((val) => val !== e.target.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                            <CheckboxComponent
                                                                value="show-analysis"
                                                                label="Show Analysis"
                                                                checked={field.value.includes('show-analysis')}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...field.value, e.target.value]
                                                                        : field.value.filter((val) => val !== e.target.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <CheckboxComponent
                                                                value="comparision"
                                                                label="Compare with Target(if given)"
                                                                checked={field.value.includes('state-wise')}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...field.value, e.target.value]
                                                                        : field.value.filter((val) => val !== e.target.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            {/* <div className="flex "> */}
                            <div >
                                <h2 className="text-xs text-darkBlue font-semibold mb-4 bg-customBlue p-2">
                                    Suggestion Based Question
                                </h2>
                            </div>
                            <div className="flex justify-between items-center flex-col items-start mb-4 gap-6">
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
                                                        className="flex gap-10 "
                                                       
                                                    >
                                                        <RadioComponent value="summerized" label="Summerized" />
                                                        <RadioComponent value="actual-value" label="Actual Value" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormLabelComponent>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            {/* <div className="flex "> */}
                            <div >
                                <h2 className="text-xs text-darkBlue font-semibold mb-4 bg-customBlue p-2">
                                    Suggestion Based Question
                                </h2>
                            </div>
                            <div className="flex justify-between items-center flex-col items-start mb-4 gap-6">

                                <FormField
                                    control={form.control}
                                    name="add_category"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem >
                                            <div className="flex items-center flex-col gap-8">
                                                {/* <FormLabel className="min-w-[10rem]">Add Category</FormLabel> */}

                                                <FormControl>
                                                    <div className="flex gap-10 ">

                                                        <CheckboxComponent
                                                            value="image-tittle"
                                                            label="Image With Tittle"
                                                            checked={field.value.includes('image-tittle')}
                                                            onChange={(e) => {
                                                                const newValue = e.target.checked
                                                                    ? [...field.value, e.target.value]
                                                                    : field.value.filter((val) => val !== e.target.value);
                                                                field.onChange(newValue);
                                                            }}
                                                        />


                                                        <CheckboxComponent
                                                            value="search"
                                                            label="Search"
                                                            checked={field.value.includes('search')}
                                                            onChange={(e) => {
                                                                const newValue = e.target.checked
                                                                    ? [...field.value, e.target.value]
                                                                    : field.value.filter((val) => val !== e.target.value);
                                                                field.onChange(newValue);
                                                            }}
                                                        />

                                                        <CheckboxComponent
                                                            value="pie"
                                                            label="Pie Chart"
                                                            checked={field.value.includes('pie')}
                                                            onChange={(e) => {
                                                                const newValue = e.target.checked
                                                                    ? [...field.value, e.target.value]
                                                                    : field.value.filter((val) => val !== e.target.value);
                                                                field.onChange(newValue);
                                                            }}
                                                        />

                                                    </div>
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="chart_type"
                                    rules={{ required: { value: true, message: "This is required*" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <SelectReminder field={field} />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-8 p-4 pt-0">
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
            </DialogContent>
        </Dialog >
    );
}
