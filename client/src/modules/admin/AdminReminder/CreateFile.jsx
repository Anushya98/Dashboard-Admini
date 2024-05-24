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
    CalendarComponent,
    FormLabelComponent,
    RadioComponent,
    SelectReminder,
} from "@/modules/hr/LeaveFile/components.jsx";
import { useState } from "react";
import ImageIcon from "@/assets/icons/image.svg"

export default function ReminderForm() {
    const [isOpen, setIsOpen] = useState(false);
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
        reminder_id: "",
        date: "",
        reminder_persons: "",


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
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (files) => {
        setSelectedFile(files[0]);
    };
    return (
        <section className="border bg-white rounded-2xl" style={{ alignSelf: "center" }}>
            <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none ">
                <h3 className="text-white font-medium">Add Detail</h3>
            </div>
            <Form onSubmit={handleSubmit} form={form} className=" gap-4">
                {/* <div className=" justify-between gap-8"> */}
                <FormField
                    control={form.control}
                    name="reminder_id"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Reminder ID">
                                <Input value="12345" readOnly />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <CalendarComponent field={field} label="Date" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reminder_persons"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Whom to Remind">
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
                    name="reminder_name"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Reminder Name">
                                <Input {...field} placeholder="Add Reminder Name Here" />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reminder_text"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Reminder Text">
                                <Textarea {...field} placeholder="Add Reminder Text Here" rows={3} />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reminder_image"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Reminder Image">
                                <div className="border border-gray-300 rounded px-8 py-8 cursor-pointer">
                                    <input
                                        type="file"
                                        id="reminder_image"
                                        accept="image/*"
                                        className="hidden" // Hide the input element
                                        onChange={(e) => handleFileUpload(e.target.files)}
                                    />
                                    <label htmlFor="reminder_image" className="file-input-label flex items-center">
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
                <FormField
                    control={form.control}
                    name="date_to_remind"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <CalendarComponent field={field} label="Date To Remind" />
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

            </Form>

            <div className="flex justify-center bg-darkBlue text-white text-center py-2 px-[2rem] rounded-b-2xl gap-5">

                <Button
                    type="submit"
                    className="bg-darkBlue rounded-3xl border-white hover:bg-white hover:text-darkBlue "
                    variant="outline"

                >
                    Set Reminder
                </Button>
                <Button
                    type="button"
                    className="border-darkBlue rounded-3xl text-darkBlue"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </section>
    );
}
