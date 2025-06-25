import { useState } from "react";
import ArrowDown from "../../assets/icons/arrow-down.svg?react";

type DropDownProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

const DropDown = ({ options, value, onChange, placeholder }: DropDownProps) => {
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	const onToggleShowDropDown = () => {
		setShowDropDown(!showDropDown);
	};

	const onSelectOption = (option: string) => {
		onChange(option);
		setShowDropDown(false);
	};

	return (
		<div className="relative w-60">
			<div
				className="flex items-center justify-between w-full h-16 px-4 py-2 text-lg bg-white border border-gray-300 rounded-xl cursor-pointer"
				onClick={onToggleShowDropDown}
			>
				<div className={`${value ? "text-black" : "text-gray20"}`}>
					{value || placeholder }
				</div>
				<ArrowDown
					className={`transition-transform duration-200 ${
						showDropDown ? "rotate-180" : ""
					}`}
				/>
			</div>

			{showDropDown && (
				<ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl lg">
					{options.map((option) => (
						<li
							key={option}
							className="p-5 text-sm  cursor-pointer hover:bg-gray rounded-xl"
							onClick={() => onSelectOption(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropDown;