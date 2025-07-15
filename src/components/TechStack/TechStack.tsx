import SearchBar from "../SearchBar";
import SelectTechStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";
import { useState, useMemo } from "react";
import useTechStack from "../../hooks/useTechStack";


export type TechStackProps = {
	value: string[];
	onChange: (updated: string[]) => void;
};

const TechStack = ({ value, onChange }: TechStackProps) => {
	const [search, setSearch] = useState('');
	const { techStack } = useTechStack();

	const filteredSearch = useMemo(() => {
		if (!search.trim()) return techStack;
		return techStack.filter((stack) =>
			stack.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, techStack]);

	const selectedStacks = techStack.filter((stack) => value.includes(stack.id));

	return (
		<div className="w-full flex flex-col gap-4 p-4 border border-gray-300 rounded-xl">
			<SearchBar value={search} onChange={setSearch} />
			<SelectTechStack
				selected={selectedStacks}
				onRemove={(id) => onChange(value.filter((v) => v !== id))}
			/>
			<TechStackLabel
				stacks={filteredSearch}
				selected={value}
				onToggle={(id) => {
					const exists = value.includes(id);
					if (exists) {
						onChange(value.filter((v) => v !== id));
					} else {
						onChange([...value, id]);
					}
				}}
			/>
		</div>
	);
};

export default TechStack;