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
  Header,
  LeaveTypeRadio,
  RadioComponent,
} from "@/modules/hr/LeaveFile/components.jsx";

export default function ApproveForm({ isOpen, setIsOpen }) {
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
        className="p-0 border-none"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Header />
        <Form
          onSubmit={handleSubmit}
          form={form}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between gap-8">
            <FormField
              control={form.control}
              name="reporting_person"
              rules={{
                required: { value: true, message: "This is required*" },
              }}
              render={({ field }) => (
                <FormItem>
                  <SelectComponent field={field} />
                </FormItem>
              )}
            />{" "}
            <FormLabelComponent label="Leave Left">
              <Input value="You Have 5.5 days left" readOnly />
            </FormLabelComponent>
          </div>
          <FormField
            control={form.control}
            name="leave_type"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabelComponent label="Leave Type">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-y-1 grow"
                    >
                      <RadioComponent value="casual" label="Casual Leave" />
                      <RadioComponent value="sick" label="Sick Leave" />
                      <RadioComponent value="other" label="Other Leave" />
                    </RadioGroup>
                  </FormControl>
                </FormLabelComponent>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-8">
            <FormField
              control={form.control}
              name="start_date"
              rules={{
                required: { value: true, message: "This is required*" },
              }}
              render={({ field }) => (
                <FormItem>
                  <CalendarComponent
                    label="From"
                    field={field}
                    isDateDisabled={isDateDisabledF}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_day_type"
              rules={{
                required: { value: true, message: "This is required*" },
              }}
              render={({ field }) => (
                <FormItem>
                  <LeaveTypeRadio field={field} />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-center gap-8">
            <FormField
              control={form.control}
              name="end_date"
              rules={{
                required: { value: true, message: "This is required*" },
              }}
              render={({ field }) => (
                <FormItem>
                  <CalendarComponent
                    label="To"
                    field={field}
                    isDateDisabled={isDateDisabledL}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_day_type"
              rules={{
                required: { value: true, message: "This is required*" },
              }}
              render={({ field }) => (
                <FormItem>
                  <LeaveTypeRadio field={field} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="reason"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabelComponent label="Leave Type">
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Type here reason for leave"
                      {...field}
                    />
                  </FormControl>
                </FormLabelComponent>
              </FormItem>
            )}
          />
          <div className="flex justify-center gap-8 p-4">
            <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
              Apply
            </Button>
            <Button
              type="button"
              className="border-blue-700 text-blue-700"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              close
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
