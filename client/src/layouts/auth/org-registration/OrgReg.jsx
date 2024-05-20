import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { commonAPI } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { prefixWith91 } from "@/lib/utils";

function OrgReg() {
  const defaultValues = {
    org_name: "",
    address: "",
    contact: "",
    email: "",
    mobile_number: "",
    num_employees: "",
  };
  const form = useForm({ defaultValues, mode: "onChange" });

  const handleRegister = async (data) => {
    try {
      const updatedData = prefixWith91(data, "mobile_number"); //add 91
      console.log(data);
      commonAPI("org-register", "POST", updatedData);
      form.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-4 p-8"
      >
        <FormField
          control={form.control}
          name="org_name"
          rules={{
            required: { value: true, message: "This is required*" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your Organization" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormControl>
                <Input placeholder="Enter Organization's Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="contact"
          rules={{
            required: {
              value: true,
              message: "This is required*",
              pattern: {
                value: /^\d{10,}$/,
                message: "Provide a valid number",
              },
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Organization's contact number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: {
              value: true,
              message: "This is required*",
              pattern: {
                value:
                  /^[a-zA-Z0-9+_.-]{3,}@[a-zA-Z0-9.-]{3,}[.][a-zA-Z]{2,4}$/,
                message: "Provide a valid email",
              },
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Organization's email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="mobile_number"
          rules={{
            required: {
              value: true,
              message: "This is required*",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Provide a valid mobile number",
              },
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Organization's mobile number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_employees"
          rules={{
            required: {
              value: true,
              message: "This is required*",
              pattern: {
                value: /^\d+$/,
                message: "Provide a number",
              },
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Organization's number of employees"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}

export default OrgReg;
