import * as React from "react";
import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";

export interface ButtonProps extends Omit<AntButtonProps, "size" | "variant"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  asChild?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    // Map variant to Antd Button props
    let antType: AntButtonProps["type"] = "default";
    let antDanger = false;
    const ghost = false;

    switch (variant) {
      case "default":
        antType = "primary";
        break;
      case "destructive":
        antType = "primary";
        antDanger = true;
        break;
      case "outline":
        antType = "default";
        break;
      case "secondary":
        antType = "default"; // Antd doesn't have secondary, use default
        break;
      case "ghost":
        antType = "text";
        break;
      case "link":
        antType = "link";
        break;
      default:
        antType = "primary"; // Default to primary as shadcn default is often primary-like
        break;
    }

    // Map size
    let antSize: AntButtonProps["size"] = "middle";
    if (size === "sm") antSize = "small";
    if (size === "lg") antSize = "large";
    if (size === "icon") antSize = "middle"; // Icon button usually middle

    return (
      <AntButton
        ref={ref}
        type={antType}
        danger={antDanger}
        size={antSize}
        ghost={ghost}
        className={className}
        {...props}
      >
        {children}
      </AntButton>
    );
  }
);
Button.displayName = "Button";

export { Button };
