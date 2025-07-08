import Button from "../Button";
import {DROPDOWN_OPTIONS} from "../../constants/dropdownOptions/dropdownOptions.ts";
import {useState} from "react";
const ProceedMethod=()=>{
	const [active,setActive]=useState<string|null>(null);
	const handleClick = (option: string) => {
		console.log(option);
		setActive(option);
	};
		return (
				<div className="flex gap-1">
					{DROPDOWN_OPTIONS.PROCEED.map((option) => {
						const isActive = active === option;
						return (
							<Button
								key={option}
								variant="circle"
								onClick={() => handleClick(option)}
								isActive={isActive}
								className={` ${isActive ? 'bg-main text-white' :'text-black'}`}
							>
								{option}
							</Button>
						)
					})}
				</div>
		);
}
export default ProceedMethod;