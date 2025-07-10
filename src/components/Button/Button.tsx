import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	variant: "primary" | "square" | "default" | "circle"| "primaryGray";
	onClick: () => void;
	isActive?: boolean;
	className?: string;
}

const Button = ({ children, onClick, variant, isActive, className = "" }: ButtonProps) => {
	const variants = {
		circle:`h-9 text-black py-1 px-7 rounded-[1.875rem] justify-center border border-main items-center ${isActive && "bg-main text-white"} `,
		primary: "bg-main w-[6rem] h-16  text-white rounded-[20px]",
		primaryGray:"bg-gray30 w-[6rem] h-16  text-black rounded-[20px]",
		square: "bg-main w-[6rem] h-16 text-white rounded-[12px]",
		default: "bg-white w-96 h-20 text-[1.75rem] text-main rounded-[2.5rem] font-bold outline-none hover:outline hover:outline-[7px] hover:outline-main",
	};

	const classes = [variants[variant], className].join(" ");

	return (
		<button className={classes} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;