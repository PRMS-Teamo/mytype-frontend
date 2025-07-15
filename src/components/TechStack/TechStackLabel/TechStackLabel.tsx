import type { TechStackType } from "../../../model/TeckStack";

type Props = {
	stacks: TechStackType[];
	selected: string[];
	onToggle: (name: string) => void;
};

const TechStackLabel = ({ stacks, selected, onToggle }: Props) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
			{stacks.map((stack) => {
				const isActive = selected.includes(stack.id);
				return (
					<div
						key={stack.id}
						onClick={() => onToggle(stack.id)}
						className={`w-full h-10 flex items-center justify-center rounded-full border text-sm cursor-pointer transition
              ${isActive ? "bg-main text-white border-main" : "bg-white text-black border-main"}`}
					>
						{stack.name}
					</div>
				);
			})}
		</div>
	);
};

export default TechStackLabel;