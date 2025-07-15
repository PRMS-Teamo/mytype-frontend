import Close from "../../../assets/icons/Close.svg?react"
import type {TechStackType} from "../../../model/TeckStack.ts";

type Props = {
	selected: TechStackType[];
	onRemove: (id: string) => void;
};

const SelectTechStack = ({ selected, onRemove }: Props) => {
	console.log('testetstest', selected)
	if (selected.length === 0) {
		return (
			<div className="border border-gray-300 rounded-xl w-full min-h-16 flex items-center p-3 text-gray-400">
				선택된 기술이 없습니다.
			</div>
		);
	}

	return (
		<div className="border border-gray-300 rounded-xl w-full min-h-16 flex flex-wrap items-center p-3 gap-2">
			{selected.map((stack) => (
				<div
					key={stack.id}
					className="px-4 h-10 gap-3 flex items-center justify-center rounded-full border text-sm bg-main text-white border-main"
				>
					{stack.name}
					<Close onClick={() => onRemove(stack.id)} />
				</div>
			))}
		</div>
	);
};

export default SelectTechStack;
// import Close from "../../../assets/icons/Close.svg?react"
// import type {TechStackType} from "../../../model/TeckStack.ts";
//
// type Props = {
// 	selected:  TechStackType[];
// 	onRemove: (name: string) => void;
// };
//
// const SelectTechStack = ({ selected, onRemove }: Props) => {
// 	if (selected.length === 0) {
// 		return (
// 			<div className="border border-gray-300 rounded-xl w-full min-h-16 flex items-center p-3 text-gray-400">
// 				선택된 기술이 없습니다.
// 			</div>
// 		);
// 	}
//
// 	return (
// 		<div className="border border-gray-300 rounded-xl w-full min-h-16 flex flex-wrap items-center p-3 gap-2">
// 			{selected.map((stack) => (
// 				<div
// 					key={stack.id}
// 					className="px-4 h-10 gap-3 flex items-center justify-center rounded-full border text-sm bg-main text-white border-main"
// 				>
// 					{stack.name}
// 					<Close onClick={() => onRemove(stack.name)} />
// 				</div>
// 			))}
// 		</div>
// 	);
// };
//
// export default SelectTechStack;