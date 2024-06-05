import { commonAPI } from "@/lib/services";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Table from "@/components/table";
import { FormComponent as Form } from "@/components/form";
import { FormField, FormItem } from "@/components/ui/form";
import { FormLabelComponent } from "@/modules/hr/LeaveFile/components";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@/assets/icons/delete.svg";
import ExpandIcon from "@/assets/icons/Expanding.svg";
import ImageIcon from "@/assets/icons/image.svg";
import CancelIcon from "@/assets/icons/cancel.svg";

function CreateReportList() {
    const [leavesData, setLeavesData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedHeading, setSelectedHeading] = useState('position'); // State to track selected heading

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const loginToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${loginToken}`,
                };
                const { data } = await commonAPI("hrcomplaints", "GET", {}, headers);
                setLeavesData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchLeaves();
    }, []);

    const columnsPosition = [
        {
            accessorKey: "si_no",
            header: "SI No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "complaint_id",
            header: "Position",
        },
        {
            accessorKey: " ",
            header: "Select an option",
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center">
                        <Button
                            variant="primary"
                            className="bg-customBlue text-darkBlue rounded-3xl"
                        >
                            All
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-customBlue text-darkBlue rounded-3xl"
                        >
                            Specific
                        </Button>
                    </div>
                );
            },
        },
    ];

    const columnsPerson = [
        {
            accessorKey: "si_no",
            header: "SI No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "complaint_id",
            header: "Employee Number",
        },
        {
            accessorKey: "department",
            header: "Position",
        },
        {
            accessorKey: " ",
            header: "Action",
            cell: ({ row }) => {
                return (
                    // <div className="flex justify-center">
                    <Button
                        variant="primary"
                        className="bg-customBlue text-darkBlue rounded-3xl"
                    >
                        Add
                    </Button>

                    // </div>
                );
            },
        },
    ];

    const columnsPeople = [
        {
            accessorKey: "si_no",
            header: "Position",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "complaint_id",
            header: "Number of people",
        },
        {
            accessorKey: " ",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-2"
                    >
                        <img src={ExpandIcon} alt="expand" className="w-4" />
                    </Button>
                );
            },
        },
    ];

    const defaultValues = {
        name: "",
        description: "",
    };

    const form = useForm({ defaultValues, mode: "onChange" });
    const handleSubmit = (data) => {
        console.log(data);
    };

    const handleFileUpload = (files) => {
        setSelectedFiles([...files]);
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

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
    };

    return (
        <section className="flex flex-col gap-2 px-2">
            <section className="border bg-white rounded-2xl">
                <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none flex justify-center items-center">
                    <h3 className="text-white font-medium">Create New List</h3>
                </div>
                <Form onSubmit={handleSubmit} form={form} className="flex gap-8 items-center justify-center">
                    <div className="flex flex-col justify-between gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Name">
                                        <Input {...field} placeholder="Enter name here" />
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: { value: true, message: "This is required*" } }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Description">
                                        <Input {...field} placeholder="Enter Description here" />
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="task_image"
                        rules={{ required: { value: true, message: "This is required*" } }}
                        render={({ field }) => (
                            <FormItem className="flex gap-4 items-center">
                                <FormLabelComponent label="Add Photo">
                                    <div
                                        className={`border border-gray-300 rounded px-4 py-4 cursor-pointer min-w-[100%] h-[50%] ${isDragging ? 'bg-gray-100' : ''}`}
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
                                                    <img src={ImageIcon} alt="image" className="w-8 mt-2" />
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />

                </Form>
            </section>
            <div className="flex gap-4">
                <div className="w-[65%]">
                    <Table
                        heading={
                            <div className="flex justify-between cursor-pointer">
                                <div className="flex gap-4">
                                    <div
                                        className={`w-max text-center text-white${selectedHeading === 'position' ? 'text-white font-bold border-b-2 border-white' : 'text-gray-600'}`}
                                        onClick={() => handleHeadingClick('position')}
                                    >
                                        Add By Position
                                    </div>
                                    <div
                                        className={`w-max text-center text-white ${selectedHeading === 'person' ? 'text-white font-bold border-b-2 border-white' : 'text-gray-600'}`}
                                        onClick={() => handleHeadingClick('person')}
                                    >
                                        Add By Person
                                    </div>
                                </div>

                            </div>
                        }
                        columns={selectedHeading === 'position' ? columnsPosition : columnsPerson}
                        data={leavesData.hr_complaints}
                        inputType="search"
                    />
                </div>
                <div className="w-[35%]">
                    <Table
                        heading="People Added"
                        columns={columnsPeople}
                        data={leavesData.hr_complaints}
                        inputType="search"
                    />
                </div>
            </div>
        </section>
    );
}

export default CreateReportList;
