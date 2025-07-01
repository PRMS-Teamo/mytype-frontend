import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  inputSize?:"tiny"| "small" | "medium" | "large";
}

const inputSizes = {
  base: "textColor-black leading-5",
  tiny: "p-5 w-64 h-10 text-base",
  small: "w-60 h-16 text-lg",
  medium: "h-16 text-lg",
  large: " h-96 text-lg",
};

const InputText = React.forwardRef<HTMLInputElement, Props>(
  ({ placeholder, inputSize = "medium", onChange, ...props }, ref) => {
    const sizeClass = inputSizes[inputSize];
    const baseClass = inputSizes.base;
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        className={`rounded-xl border border-gray-300 bg-white px-6 py-2" ${baseClass} ${sizeClass}`}
        {...props}
      />
    );
  }
);

export default InputText;