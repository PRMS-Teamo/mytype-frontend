import SearchBar from "../SearchBar";
import SelectTechStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";
import {useState} from "react";
import useTechStack from "../../hooks/useTechStack";
import type {TechStackType} from "../../model/TeckStack.ts";
import {useSetUserTemp, useUserTemp} from "../../store/userTempStore.ts";

const TechStack = () => {
	const [search, setSearch] = useState('');
	const { techStack } = useTechStack();

	const user = useUserTemp();
	const setUser = useSetUserTemp();

	const selectedStacks = user?.userStacks ?? [];

	const isSelected = (stack: TechStackType) => {
		return selectedStacks.some((s) => s.stackId === stack.stackId);
	}

	const handleToggle = (stack: TechStackType) => {
		if (!user) return;
		const exists = isSelected(stack);
		const updatedStacks = exists
			? selectedStacks.filter((s) => s.stackId !== stack.stackId)
			: [...selectedStacks, stack];
		setUser({ ...user, userStacks: updatedStacks });
	};

	const handleRemove = (stackId: string) => {
		if (!user) return;
		const updatedStacks = selectedStacks.filter((s) => s.stackId !== stackId);
		setUser({ ...user, userStacks: updatedStacks });
	};

	return (
		<div className="w-full flex flex-col gap-4 p-4 border border-gray-300 rounded-xl">
			<SearchBar value={search} onChange={setSearch} />
			<SelectTechStack
				selected={selectedStacks}
				onRemove={handleRemove}
			/>
			<TechStackLabel
				stacks={techStack}
				selected={selectedStacks}
				onToggle={handleToggle}
			/>
		</div>
	);
};

export default TechStack;