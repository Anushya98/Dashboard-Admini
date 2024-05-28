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
    SelectComponent,
    SelectBloodGroups,
    SelectQualification,
    Header,
    LeaveTypeRadio,
    RadioComponent,
    SelectWorkType,
} from "@/modules/hr/LeaveFile/components.jsx";
import { useState } from "react";
import PreviewForm from "./Preview";
import CsvButtons from "@/components/CSV-btn";
import CreateNewUserButton from "@/components/new-user-btn";

export default function DetailForm({ isCsvPage, isNewUserPage }) {
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

    const csvButtons = isCsvPage && (
        <CsvButtons
            onTemplateClick={() => console.log("CSV Template Clicked")}
            onUploadClick={() => console.log("CSV Upload Clicked")}
        />
    );

    const createNewUserButton = isNewUserPage && (
        <CreateNewUserButton onClick={() => console.log("Create New User Clicked")} />
    );


    return (
        <section className="border bg-white rounded-2xl" style={{ alignSelf: "center" }}>
            <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none flex justify-between items-center">
                <h3 className="text-white font-medium">Add Detail</h3>
                <div className="flex gap-10">
                    {csvButtons}
                    {createNewUserButton}
                </div>
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
                                <FormLabelComponent label="Name">
                                    <Input {...field} placeholder="Enter name here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="official_email"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Official Email">
                                    <Input {...field} placeholder="Enter official email ID here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">
                    <FormField
                        control={form.control}
                        name="whatsapp_number"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="WhatsApp Number">
                                    <Input
                                        {...field}
                                        value={`+91 ${field.value.replace(/^\+91\s*/, '')}`} // Ensure +91 is always present and only digits are added
                                        // onChange={(e) => {
                                        //     // Ensure only numeric values are accepted after +91
                                        //     const value = e.target.value.replace(/^\+91\s*/, '').replace(/\D/g, '').slice(0, 10); // Limit to 10 digits
                                        //     field.onChange(value);
                                        // }}
                                        placeholder="Enter WhatsApp number"
                                    />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Address">
                                    <Textarea {...field} placeholder="Enter address here" rows={3} />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">
                    <FormField
                        control={form.control}
                        name="phone_number"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Phone Number">
                                    <Input
                                        {...field}
                                        value={`+91 ${field.value.replace(/^\+91\s*/, '')}`}
                                        placeholder="Enter Phone number"
                                    />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="employee_id"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Employee ID">
                                    <Input {...field} placeholder="Enter Employee ID here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">
                    <FormField
                        control={form.control}
                        name="department"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Department">
                                    <Input {...field} placeholder="Enter Department here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="designation"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Designation">
                                    <Input {...field} placeholder="Enter Designation here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">
                    {/* <FormField
                        control={form.control}
                        name="add_photo"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Add Photo">
                                    <div className="border border-gray-300 rounded px-4 py-2 cursor-pointer">
                                        <input
                                            type="file"
                                            id="add_photo"
                                            accept="image/*"
                                            className="hidden" // Hide the input element
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                        />
                                        <label htmlFor="add_photo" className="file-input-label">
                                            {selectedFile ? selectedFile.name : 'Upload Photo here'}
                                        </label>
                                    </div>
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="date_of_joining"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <CalendarComponent field={field} label="Date Of Joining" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="blood_group"
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
                        name="qualification"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectQualification field={field} />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="personal_email"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Personal Email">
                                    <Input {...field} placeholder="Enter Personal email ID here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-8">
                    <FormField
                        control={form.control}
                        name="Work_type"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectWorkType field={field} />
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
            <div className="flex justify-center bg-darkBlue text-white text-center py-2 px-[2rem] rounded-b-2xl gap-5">

                <Button
                    type="submit"
                    className="bg-darkBlue rounded-3xl border-white hover:bg-white hover:text-darkBlue "
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                >
                    Preview
                </Button>
                <PreviewForm isOpen={isOpen} setIsOpen={setIsOpen} />
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
