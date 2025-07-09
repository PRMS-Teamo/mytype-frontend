import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  inputSize?:"tiny"| "small" | "medium" | "large";
}

const inputSizes = {
  base: "textColor-black leading-5",
  tiny: "flex gap-20  h-10 text-base rounded-lg border border-gray-300 px-4 py-2",
  small: " h-16 w-32  text-lg text-right rounded-xl",
  medium: "h-16 text-lg rounded-xl",
  large: " h-96 text-lg rounded-xl",
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
        className={` border border-gray-300 bg-white px-6 py-2" ${baseClass} ${sizeClass}`}
        {...props}
      />
    );
  }
);

export default InputText;