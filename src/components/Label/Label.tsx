import React from "react";

interface LabelProps {
	children: React.ReactNode;
}

const Label = ({ children }:  LabelProps) => {
	return(
		<div className="leading-5 text-base font-medium text-gray10">{children}</div>
	)
}

export default Label;