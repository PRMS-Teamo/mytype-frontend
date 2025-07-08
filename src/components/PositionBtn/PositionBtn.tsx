import {POSITION} from "../../constants/position/position.ts";
import {useState} from "react";


const PositionBtn = () => {
	const [active, setActive] =useState<string| null>(null);
	const handleClick = (label: string) => {
		console.log("선택한 포지션:", label);
		setActive(label);
	};

	return (
		<div className="grid grid-cols-4 gap-4 py-4 px-36 ">
			{POSITION.map((position) => {
				const isActive = active === position.label;
				return(
					<button
						key={position.id}
						className={`${isActive? "bg-main text-white" : "bg-white text-black"} rounded-full px-4 py-4 border border-main `}
						onClick={() => handleClick(position.label)}
					>
						{position.label}
					</button>
				)
			})}
		</div>
	);
};

export default PositionBtn;