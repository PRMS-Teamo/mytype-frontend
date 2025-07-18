import type { Position } from "../../hooks/usePositions.ts";
import usePosition from "../../hooks/usePositions.ts";



type PositionBtnProps = {
	value: Position
	onChange: (position: Position) => void;
};

const PositionBtn = ({ value, onChange }: PositionBtnProps) => {
	const { positions } = usePosition();

	return (
		<div className="grid grid-cols-4 gap-4 py-4 px-36">
			{positions.map((position) => {
				const isActive = value?.id === position.id;
				return (
					<button
						key={position.id}
						className={`${
							isActive ? "bg-main text-white" : "bg-white text-black"
						} rounded-full px-4 py-4 border border-main`}
						onClick={() => onChange(position)}
					>
						{position.name}
					</button>
				);
			})}
		</div>
	);
};

export default PositionBtn;