
import SearchBar from "../SearchBar";
import SelectTechStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";
import { techStackMock } from "../../mock/data/techStackMock";
import { useState, useMemo } from "react";

export type TechStackProps = {
	value: string[];
	onChange: (updated: string[]) => void;
};

const TechStack = ({ value, onChange }: TechStackProps) => {
	const [search, setSearch] = useState('');

	const filteredSearch = useMemo(() => {
		if (!search.trim()) return techStackMock.techStack;
		return techStackMock.techStack.filter((stack) =>
			stack.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search]);

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