
import SearchBar from "../SearchBar";
import SelectTechStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";
import { useState, useMemo } from "react";
import useTechStack from "../../hooks/useTechStack.ts";

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
	}, [search,techStack]);

	return (
		<div className="w-full flex flex-col gap-4 p-4 border border-gray-300 rounded-xl">
			<SearchBar value={search} onChange={setSearch} />
			<SelectTechStack
				selected={value}
				onRemove={(name) => onChange(value.filter((v) => v !== name))}
			/>
			<TechStackLabel
				stacks={filteredSearch}
				selected={value}
				onToggle={(item) => {
					const exists = value.includes(item);
					if (exists) {
						onChange(value.filter((v) => v !== item));
					} else {
						onChange([...value, item]);
					}
				}}
			/>
		</div>
	);
};

export default TechStack;