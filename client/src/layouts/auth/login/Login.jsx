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

function Login() {
  const defaultValues = { username: "", password: "" };
  const form = useForm({ defaultValues, mode: "onChange" });

  const handleLogin = async (data) => {
    try {
      console.log(data);
      const response = await commonAPI("login", "POST", data);
      localStorage.setItem("accessToken", response.data.access_token);
      form.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4 p-8">
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
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}

export default Login;
