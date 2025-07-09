import Button from "../Button";
import {DROPDOWN_OPTIONS} from "../../constants/dropdownOptions/dropdownOptions.ts";

type ProceedMethodProps = {
	value: string;
	onChange: (method: string) => void;
};

const ProceedMethod = ({ value, onChange }: ProceedMethodProps) => {
	return (
		<div className="flex gap-1">
			{DROPDOWN_OPTIONS.PROCEED.map((option) => {
				const isActive = value === option;
				return (
					<Button
						key={option}
						variant="circle"
						onClick={() => onChange(option)}
						isActive={isActive}
						className={` ${isActive ? 'bg-main text-white' : 'text-black'}`}
					>
						{option}
					</Button>
				);
			})}
		</div>
	);
};

export default ProceedMethod;