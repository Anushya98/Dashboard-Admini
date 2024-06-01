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

export default function RequestMailForm({ isOpen, setIsOpen }) {
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
                    <h3 className="text-white font-medium">Request New Form</h3>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    form={form}
                    className="flex flex-col gap-4 items-center"
                >
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="created_by"
                            rules={{
                                required: { value: true, message: "This is required*" },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[100%]">Created By</FormLabel>
                                    <Input className="w-[100%]" {...field} placeholder="Enter Name Here" />
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
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[100%]">Format Description (Recommended)</FormLabel>
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
                    </div>

                    <div className="flex justify-center gap-8 p-4">
                        <Button
                            type="submit"
                            className="bg-darkBlue text-white rounded-3xl border-white hover:border-darkBlue hover:bg-white hover:text-darkBlue "
                            variant="outline"

                        >
                            Recommended
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
