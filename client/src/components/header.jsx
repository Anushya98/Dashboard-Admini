import { cn } from "@/lib/utils";

export default function Header({ children, className }) {
  return (
    <div
      className={cn("p-4 bg-primaryColor rounded-lg rounded-b-none", className)}
    >
      <h3 className="text-white font-medium">{children}</h3>
    </div>
  );
}
