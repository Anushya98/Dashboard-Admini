import { Button } from "@/components/ui/button";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const FormLabelComponent = ({ label, children }) => (
  <div className="flex items-center">
    <FormLabel className="min-w-[10rem]">{label}</FormLabel>
    {children}
  </div>
);
export const ImageComponent = ({ label, children }) => (
  <div className="flex flex-col items-center">
    <FormImage className="min-w-[10rem]">{label}</FormImage>
    {children}
  </div>
);
export const RadioComponent = ({ value, label, isCreateNewReportPage }) => {
  const textSize = isCreateNewReportPage ? "text-xs" : "text-sm";

  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className={`font-normal ${textSize}`}>{label}</FormLabel>
    </FormItem>
  );
};
export const CheckboxComponent = ({ value, label }) => (
  <FormItem className="flex items-center space-x-3 space-y-0">
    <FormControl>
      <Checkbox value={value} />
    </FormControl>
    <FormLabel className="font-normal text-xs">{label}</FormLabel>
  </FormItem>
);

export const LeaveTypeRadio = ({ field }) => (
  <FormLabelComponent label="Leave Type">
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex space-y-1 grow -ml-12"
      >
        <RadioComponent value="full" label="Full" />
        <RadioComponent value="first_half" label="First Half" />
        <RadioComponent value="second_half" label="Second Half" />
      </RadioGroup>
    </FormControl>
  </FormLabelComponent>
);

export const CalendarComponent = ({ field, isDateDisabled, label }) => (
  <FormLabelComponent label={label}>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal min-w-[10rem]",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  </FormLabelComponent>
);

export const Header = () => (
  <div className="p-4 bg-darkBlue rounded-lg rounded-b-none ">
    <h3 className="text-white font-medium">Leave Application</h3>
  </div>
);
export const Footer = () => (
  <div className="flex justify-center bg-darkBlue text-white text-center py-2 px-[2rem] rounded-b-2xl gap-5">
    <h3 className="text-white font-medium">Net Pay </h3>
    <h3 className="text-white font-medium">Rs.25000</h3>
  </div>
);

export const SelectComponent = ({ field, showLabel = true }) => (
  <React.Fragment>
    {showLabel && <FormLabelComponent label="Reporting Person" />}
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[5rem]">
          <SelectValue placeholder="Select an email" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="m@example.com">m@example.com</SelectItem>
        <SelectItem value="m@google.com">m@google.com</SelectItem>
        <SelectItem value="m@support.com">m@support.com</SelectItem>
      </SelectContent>
    </Select>
  </React.Fragment>
);


export const SelectBloodGroups = ({ field }) => (
  <FormLabelComponent label="Select Blood Group">
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[10rem]">
          <SelectValue placeholder="Select Blood group" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="O+">O positive</SelectItem>
        <SelectItem value="B+">B positive</SelectItem>
        <SelectItem value="A+">A positive</SelectItem>
        <SelectItem value="AB+">AB positive</SelectItem>
        <SelectItem value="O-">O negative</SelectItem>
        <SelectItem value="B-">B negative</SelectItem>
        <SelectItem value="A-">A negative</SelectItem>
        <SelectItem value="AB-">AB negative</SelectItem>
      </SelectContent>
    </Select>
  </FormLabelComponent>
);
export const SelectQualification = ({ field }) => (
  <FormLabelComponent label="Qualification" className="min-w-[5rem]">
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[10rem]">
          <SelectValue placeholder="Select Qualification" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="Graduate">Graduate</SelectItem>
        <SelectItem value="UG">Under Graduate</SelectItem>
        <SelectItem value="PG">Post Graduate</SelectItem>

      </SelectContent>
    </Select>
  </FormLabelComponent>
);
export const SelectReminder = ({ field }) => (
  <FormLabelComponent label="Reminder Type" className="min-w-[5rem]">
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[10rem]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="Whatsapp">WhatsApp</SelectItem>
        <SelectItem value="Call">Call</SelectItem>
        <SelectItem value="Whatsapp & Call">WhatsApp And Call</SelectItem>

      </SelectContent>
    </Select>
  </FormLabelComponent>
);

export const SelectWorkType = ({ field }) => (
  <FormLabelComponent label="Type Of Work" className="min-w-[5rem]">
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[10rem]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="full-time">Full Time</SelectItem>
        <SelectItem value="part-time">Part Time</SelectItem>
      </SelectContent>
    </Select>
  </FormLabelComponent>
);

export const SelectLevel = ({ field, showLabel = true, options }) => (
  <React.Fragment>
    {showLabel && <FormLabelComponent label=" " />}
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="min-w-[5rem]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}
            />
            <span>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </React.Fragment>
);
