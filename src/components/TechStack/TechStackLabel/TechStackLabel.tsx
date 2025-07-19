import type { TechStackType } from "../../../model/TeckStack";

type Props = {
	stacks: TechStackType[];
	selected: TechStackType[]; // 객체를 넘기는 형태.
	onToggle: (stack: TechStackType) => void;
};

const TechStackLabel = ({ stacks, selected, onToggle }: Props) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
			{stacks.map((stack) => {
				console.log("selected", selected);
				console.log("stack", stack)
				const isActive = selected.some((s) => s.stackId === stack.stackId);
				return (
					<div
						key={stack.stackId}
						onClick={() => onToggle(stack)}
						className={`w-full h-10 flex items-center justify-center rounded-full border text-sm cursor-pointer transition
              ${isActive ? "bg-main text-white border-main" : "bg-white text-black border-main"}`}
						style={{ backgroundColor: isActive ? "#5932EA" : "#FFFFFF" }}
					>
						{stack.stackName}
					</div>
				);
			})}
		</div>
	);
};

export default TechStackLabel;