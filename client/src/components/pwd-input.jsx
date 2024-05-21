import { useState } from "react";
import showPasswordIcon from "@/assets/icons/eye-svgrepo-com.svg";
import hidePasswordIcon from "@/assets/icons/eye-slash-svgrepo-com.svg";
import { Input } from "@/components/ui/input";

export default function PwdInput({ field }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        {...field}
      />
      <span
        className="cursor-pointer absolute top-2 right-6"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <img src={showPasswordIcon} alt="eye-icon" className="w-5" />
        ) : (
          <img src={hidePasswordIcon} alt="eye-icon" className="w-5" />
        )}
      </span>
    </div>
  );
}
