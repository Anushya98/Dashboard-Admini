import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
    CalendarComponent,
    FormLabelComponent,
    SelectComponent,
    Header,
    LeaveTypeRadio,
    RadioComponent,
    SelectReminder
} from "@/modules/hr/LeaveFile/components.jsx";
import ImageIcon from "@/assets/icons/image.svg"

export default function CreateTask({ isOpen, setIsOpen }) {
    const isDateDisabledF = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to the beginning of today
        date.setHours(0, 0, 0, 0); // Set the time of the date being checked to the beginning of the day
        return date < today; // Disable dates before today
    };
    const isDateDisabledL = (date) => {
        if (!fDate) return true; // Disable all dates if fDate is not set
        date.setHours(0, 0, 0, 0);
        return date < fDate; // Disable dates before the selected fDate
    };
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
    const fDate = form.watch("start_date");
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

    const {formState } = useForm({ mode: "onChange" });


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (files) => {
        setSelectedFile(files[0]);

    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {
                setIsOpen(!open);
            }}
        >
            <DialogContent
                className="p-0 border-none"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
               <div className="p-4 bg-darkBlue rounded-md rounded-b-none">
                    <h3 className="text-white font-medium">Create New Task</h3>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    form={form}
                    className="flex flex-col"
                >
                    <div className="flex justify-between gap-8">
                        <FormField
                            control={form.control}
                            name="task_id"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Task ID">
                                        <Input value="12345" readOnly />
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due_date1"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <CalendarComponent
                                        label="Due Date 1"
                                        field={field}
                                        isDateDisabled={isDateDisabledF}
                                    />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between items-center gap-8">

                        <FormField
                            control={form.control}
                            name="date"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <CalendarComponent
                                        label="Date"
                                        field={field}
                                        isDateDisabled={isDateDisabledF}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due_date2"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>

                                    <CalendarComponent
                                        label="Due Date 2"
                                        field={field}
                                        isDateDisabled={isDateDisabledF}
                                    />

                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <FormField
                            control={form.control}
                            name="task_persons"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Whom to Allocate">
                                        <div >
                                            <Input {...field} placeholder="Choose List" className="mb-8" />
                                            <Input {...field} placeholder="Choose List" />
                                        </div>
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time_to_remind"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <CalendarComponent field={field} label="Time To Remind" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <FormField
                            control={form.control}
                            name="task_name"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Task Name">
                                        <Input {...field} placeholder="Add Task Name Here" />
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="get_reply"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Get Reply">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-y-1 grow"
                                            >
                                                <RadioComponent value="Yes" label="Yes" />
                                                <RadioComponent value="No" label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <FormField
                            control={form.control}
                            name="task_text"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Task Text">
                                        <Textarea {...field} placeholder="Add Task Text Here" rows={3} />
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reminder_type"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <SelectReminder field={field} />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <FormField
                            control={form.control}
                            name="task_image"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelComponent label="Task Image">
                                        <div className="border border-gray-300 rounded px-8 py-8 cursor-pointer">
                                            <input
                                                type="file"
                                                id="task_image"
                                                accept="image/*"
                                                className="hidden" // Hide the input element
                                                onChange={(e) => handleFileUpload(e.target.files)}
                                            />
                                            <label htmlFor="task_image" className="file-input-label flex items-center">
                                                {selectedFile ? (
                                                    <span>{selectedFile.name}</span>
                                                ) : (
                                                    <img src={ImageIcon} alt="image" className="w-4" />

                                                )}
                                            </label>
                                        </div>
                                    </FormLabelComponent>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                        <Button type="submit" className="bg-darkBlue text-white hover:bg-transparent hover:border-darkBlue hover:text-darkBlue rounded-3xl" variant="outline" disabled={!formState.isValid}>
                            Send Task
                        </Button>
                        <Button type="button" className="border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white rounded-3xl" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
