import {POSITION} from "../../constants/position/position.ts";
import type {PositionType} from "../../model/Post.ts";

type PositionBtnProps = {
	value: PositionType | null;
	onChange: (position: PositionType) => void;
};

const PositionBtn = ({ value, onChange }: PositionBtnProps) => {
	return (
		<div className="grid grid-cols-4 gap-4 py-4 px-36">
			{POSITION.map((position) => {
				const isActive = value === position.label;
				return (
					<button
						key={position.id}
						className={`${
							isActive ? "bg-main text-white" : "bg-white text-black"
						} rounded-full px-4 py-4 border border-main`}
						onClick={() => onChange(position.label as PositionType)}
					>
						{position.label}
					</button>
				);
			})}
		</div>
	);
};

export default PositionBtn;