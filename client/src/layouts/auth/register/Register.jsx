import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/pwd-input";
import { commonAPI } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Register() {
  const [data, setData] = useState([]);
  const [orgNames, setOrgNames] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");

  const defaultValues = {
    username: "",
    password: "",
    phonenumber: "",
    department: "",
    role: "",
    organization_name: "",
  };
  const form = useForm({ defaultValues, mode: "onChange" });

  const orgName = form.watch("organization_name");
  const department = form.watch("department");

  const handleRegister = async (data) => {
    try {
      console.log(data);
      // commonAPI("register", "POST", data);
      form.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchOrgNames = async () => {
      try {
        const { data } = await commonAPI("organisation");
        setData(data);
        setOrgNames(data.Organisation.map((org) => org.org_name));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchOrgNames();
  }, []);

  useEffect(() => {
    if (orgName) {
      const selectedOrganization = data.Organisation.find(
        (org) => org.org_name === orgName
      );
      setSelectedOrg(selectedOrganization);
      setDepartments(selectedOrganization.departments);
    }
  }, [orgName]);

  useEffect(() => {
    if (department) {
      const selectedDepartment = selectedOrg.departments.find(
        (dep) => dep.actual_name === department
      );
      setRoles(selectedDepartment.roles);
    }
  }, [department]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-4 p-8"
      >
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: { value: true, message: "This is required*" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: { value: true, message: "This is required*" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phonenumber"
          rules={{
            required: { value: true, message: "This is required*" },
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Provide a valid number (avoid +91)",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your phonenumber" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{
            required: { value: true, message: "This is required*" },
          }}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orgNames &&
                    orgNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {orgName && (
          <FormField
            control={form.control}
            name="department"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments &&
                      departments.map(({ actual_name }) => (
                        <SelectItem key={actual_name} value={actual_name}>
                          {actual_name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {department && (
          <FormField
            control={form.control}
            name="role"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles &&
                      roles.map(({ actual_role }) => (
                        <SelectItem key={actual_role} value={actual_role}>
                          {actual_role}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}

export default Register;
