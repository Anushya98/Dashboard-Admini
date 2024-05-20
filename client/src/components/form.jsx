import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function FormComponent({ form, onSubmit, children, className }) {
  return (
    <Form {...form}>
      <form
        onSubmit={form?.handleSubmit(onSubmit)}
        className={cn("space-y-4 p-4", className)}
      >
        {children}
      </form>
    </Form>
  );
}
