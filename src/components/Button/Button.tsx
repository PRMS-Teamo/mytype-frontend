import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	variant: "primary" | "square" | "default";
	onClick: () => void;
	className?: string;
}

const Button = ({ children, variant, onClick, className = "" }: ButtonProps) => {
	const variants = {
		primary: "bg-main w-[6rem] h-16  text-white rounded-[20px]",
		square: "bg-main w-[6rem] h-16 text-white rounded-[12px]",
		default: "bg-white w-96 h-20 text-[1.75rem] text-main rounded-[2.5rem] font-bold outline-none hover:outline hover:outline-[7px] hover:outline-main",
	};

	const classes = [variants[variant], className].join(" ");

	return (
		<button onClick={onClick} className={classes}>
			{children}
		</button>
	);
};

export default Button;