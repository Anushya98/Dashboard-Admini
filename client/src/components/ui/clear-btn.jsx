import { cn } from "@/lib/utils";

const ClearButton = ({ value, onClick, className }) => {
  if (value)
    return (
      <span className={cn("cursor-pointer", className)} onClick={onClick}>
        x
      </span>
    );
};

export default ClearButton;
