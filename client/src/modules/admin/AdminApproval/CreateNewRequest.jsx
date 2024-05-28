import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormItem, FormField } from "@/components/ui/form";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import { Textarea } from "@/components/ui/textarea";
import {
    FormLabelComponent,
    SelectReminder,
} from "@/modules/hr/LeaveFile/components.jsx";
import { useState } from "react";

export default function ApprovalForm() {
    const [isOpen, setIsOpen] = useState(false);
    const isDateDisabledF = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };
    const isDateDisabledL = (date) => {
        if (!fDate) return true;
        date.setHours(0, 0, 0, 0);
        return date < fDate;
    };
    const defaultValues = {
        request_id: "",
        date: "",
        created_by: "",
        need: "",
        purchase_value: "",
        description: "",
        approver1: "",
        approver2: ""
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
                    name="request_id"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Request ID">
                                <Input value="12345" readOnly />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="need"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Need">
                                <Input {...field} placeholder="Add Here" />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="purchase_value"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Purchase Value">
                                <Input {...field} placeholder="Add Here" />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabelComponent label="Description">
                                <Textarea {...field} placeholder="Add Description Text Here" rows={5} />
                            </FormLabelComponent>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="approver1"
                    rules={{
                        required: { value: true, message: "This is required*" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <SelectReminder field={field} />
                        </FormItem>
                    )}
                />{" "}
                <FormField
                    control={form.control}
                    name="approver2"
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
                    Send Request
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
