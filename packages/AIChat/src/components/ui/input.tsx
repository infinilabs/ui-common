import * as React from "react"
import { Input as AntInput, type InputProps as AntInputProps, type InputRef } from "antd"

export type InputProps = AntInputProps;
export type { InputRef };

const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, type, ...props }, ref) => {
    // antd Input uses inputRef instead of ref for the underlying input element
    // but ref on AntInput component refers to the wrapper or input instance.
    // However, shadcn usage expects ref to be HTMLInputElement.
    // Antd Input ref returns InputRef, which has input property.
    
    return (
      <AntInput
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
