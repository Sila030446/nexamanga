"use client";

import { ComponentProps, forwardRef, useState } from "react";
import { Input } from "../input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaKey } from "react-icons/fa";

interface PasswordInputProps
  extends Omit<ComponentProps<typeof Input>, "type"> {
  showIcon?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showIcon = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full relative">
        {showIcon && (
          <FaKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        )}
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-12",
            showIcon && "pl-10",
            "w-full h-full py-2 text-md",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
