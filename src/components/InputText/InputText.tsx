import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    inputSize?: "small" | "medium" | "large"; 
}

const inputSizes = {
  base:" text-lg textColor-black leading-5",
    small: "w-60 h-16",
    medium: "w-[800px] h-16",
    large: "w-[800px] h-96",
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