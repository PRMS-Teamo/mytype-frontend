import type { TechStackType } from "../../../model/TeckStack.ts";
import Close from "../../../assets/icons/Close.svg?react"

type Props = {
	selected: TechStackType[];
	onRemove: (id: number) => void;
};

const SelectTechStack = ({ selected, onRemove }: Props) => {
	if (selected.length === 0) {
		return (
			<div className="border border-gray-300 rounded-xl w-full min-h-16 flex items-center p-3 text-gray-400">
				선택된 기술이 없습니다.
			</div>
		);
	}

	return (
		<div className="border border-gray-300 rounded-xl w-full min-h-16 flex flex-wrap items-center p-3 gap-2">
			{selected.map(({ id, name }) => (
				<div
					key={id}
					className="px-4 h-10 gap-3 flex items-center justify-center rounded-full border text-sm bg-main text-white border-main"
				>
					{name}
						<Close onClick={() => onRemove(id)} />

				</div>
			))}
		</div>
	);
};

export default SelectTechStack;