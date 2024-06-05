import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import { FormComponent as Form } from "@/components/form";
import { hyphenDate } from "@/lib/date-format";
import {
    FormLabelComponent,
    SelectBank,
    SelectBloodGroups,
    SelectDepartment,
    SelectDesignation,
   
} from "@/modules/hr/LeaveFile/components.jsx";
import { useState } from "react";

export default function CreatePayslipForm() {
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


    return (
        <section className="border bg-white rounded-2xl" style={{ alignSelf: "center" }}>
            <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-white font-medium">Pay Slip</h3>
                    <h2 className="text-white font-normal">Create Payslip for an employee</h2>
                </div>
            </div>
            <Form onSubmit={handleSubmit} form={form} className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="employee_name"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Employee Name">
                                    <Input {...field} placeholder="Enter name here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="basic_pay"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Basic Pay">
                                    <Input {...field} placeholder="Enter Basic Salary here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="employee_id"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Employee Id">
                                    <Input {...field} placeholder="Enter Employee Id here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dearness_allowance"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Dearness Allowance">
                                    <div className="flex gap-2">
                                        <Input {...field} placeholder="Amount in %" />
                                        <Input {...field} placeholder="Amount in Ruppees" />
                                    </div>
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex  gap-8">
                    <FormField
                        control={form.control}
                        name="department"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectDepartment field={field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="house_rent"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="House Rent Allowance">
                                    <Input {...field} placeholder="Enter PAN Number here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="designation"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectDesignation field={field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="epf"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Employee Provident Fund">
                                    <div className="flex gap-2">
                                        <Input {...field} placeholder="Amount in %" />
                                        <Input {...field} placeholder="Amount in Ruppees" />
                                    </div>
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="bank_name"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <SelectBank field={field} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="health_insurance"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Employee Provident Fund">
                                    <div className="flex gap-2">
                                        <Input {...field} placeholder="Amount in %" />
                                        <Input {...field} placeholder="Amount in Ruppees" />
                                    </div>
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="bank_account"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Bank Account Number">
                                    <Input {...field} placeholder="Enter Bank Account Nummber Here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="net_salary"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="Net Salary">
                                    <Input {...field} placeholder="Enter Net Salary Here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="pan_number"
                        rules={{
                            required: { value: true, message: "This is required*" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelComponent label="PAN Number">
                                    <Input {...field} placeholder="Enter Your PAN Nummber Here" />
                                </FormLabelComponent>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
            <div className="flex justify-center text-center py-2 px-[2rem] gap-5">

                <Button
                    type="submit"
                    className="bg-darkBlue text-white rounded-3xl border-white hover:bg-white hover:border-darkBlue hover:text-darkBlue "
                    variant="outline">
                    Create
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
        </section>
    );
}
