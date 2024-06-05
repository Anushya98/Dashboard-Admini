import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import { Textarea } from "@/components/ui/textarea";
import {
    CalendarComponent,
    FormLabelComponent,
    SelectBloodGroups,
} from "@/modules/hr/LeaveFile/components.jsx";
import { useState } from "react";

export default function QuestionForm() {
    const [isOpen, setIsOpen] = useState(false);

    const defaultValues = {
        name: "",
        official_email: "",
        whatsapp_number: "",
        address: "",
        phone_number: "",
        employee_id: "",
        department: "",
        designation: "",
        add_photo: "",
        date_of_joining: "",
        blood_group: "",
        qualification: "",
        personal_email: "",

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


    return (
        <section className="border bg-white rounded-2xl" >
            <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none flex justify-between items-center">
                <h3 className="text-white font-medium">Create Question List</h3>
            </div>
            <Form onSubmit={handleSubmit} form={form} className="flex flex-col gap-4">
                <div className="flex justify-between gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Name of Question List">
                                    <Input {...field} placeholder="Enter name of Question List here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="frequency"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectBloodGroups field={field} />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">

                    <FormField
                        control={form.control}
                        name="question_type"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectBloodGroups field={field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <CalendarComponent field={field} label="Ask Time" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">

                    <FormField
                        control={form.control}
                        name="question"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Enter The Question">
                                    <Textarea rows={5} {...field} placeholder="Enter the question here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="report_time"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <CalendarComponent field={field} label="Report Time" />
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
            <div className="flex justify-center  text-center py-2 px-[2rem] rounded-b-2xl gap-5">

                <Button
                    type="submit"
                    className="bg-darkBlue text-white rounded-3xl border-white hover:bg-white hover:text-darkBlue "
                    variant="outline"
                >
                    save Question
                </Button>
                <Button
                    type="button"
                    className="border-darkBlue bg-white rounded-3xl text-darkBlue hover:bg-darkBlue hover:text-white "
                    variant="outline"
                // onClick={() => setIsOpen(false)}
                >
                    + Add Question
                </Button>
            </div>
        </section>
    );
}
