import {PLACEHOLDER} from "../../constants/placeholder/placeholders.ts";
import React from "react";

type TextAreaProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ value, onChange }: TextAreaProps) => {
	return (
		<textarea
			className="w-full h-48 p-5 border border-gray-300 rounded-xl resize-none"
			placeholder={PLACEHOLDER.CONTENT}
			value={value}
			onChange={onChange}
		></textarea>
	);
};

export default TextArea;