import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import { Textarea } from "@/components/ui/textarea";
import {
    FormLabelComponent,
    Header,

} from "@/modules/hr/LeaveFile/components.jsx";
import { FormLabel } from "@/components/ui/form";
import ImageIcon from "@/assets/icons/image.svg";
import CancelIcon from "@/assets/icons/cancel.svg";
import { useState } from "react";


export default function MailFormTemplate({ isOpen, setIsOpen }) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const defaultValues = {
        start_date: "",
        end_date: "",
        leave_days: "",
        leave_type: "",
        reporting_person: "",
        start_day_type: "",
        end_day_type: "",
        reason: "",
    };
    const form = useForm({ defaultValues, mode: "onChange" });
    const handleSubmit = (data) => {
        const formattedStartDate = hyphenDate(data.start_date);
        const formattedEndDate = hyphenDate(data.end_date);
        const updatedData = {
            ...data,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        };
        console.log(updatedData);
    };

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



    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {
                setIsOpen(!open);
            }}
        >
            <DialogContent
                className="p-0 border-none min-w-[50%]"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-4 bg-darkBlue rounded-lg rounded-b-none ">
                    <h3 className="text-white font-medium">Form Template</h3>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    form={form}
                    className="flex flex-col gap-4 items-center"
                >
                    <div className="flex flex-col gap-8 w-[65%]">
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[100%]">Format Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            placeholder="Enter Description here"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* </FormLabelComponent> */}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="condition"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[100%]">Condition</FormLabel>
                                    <Input className="w-[100%]" {...field} placeholder="Enter Condition Here" />
                                </FormItem>
                            )}
                        />

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
                                                            <img src={ImageIcon} alt="image" className="w-12 mt-2 mb-4" />
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
                    </div>

                    <div className="flex justify-center gap-8 p-4">
                        <Button
                            type="submit"
                            className="bg-darkBlue text-white rounded-3xl border-white hover:border-darkBlue hover:bg-white hover:text-darkBlue "
                            variant="outline"

                        >
                            Submit To Team
                        </Button>
                        <Button
                            type="button"
                            className="border-darkBlue rounded-3xl text-darkBlue hover:text-white hover:bg-darkBlue "
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
