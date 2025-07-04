import SearchBar from "../SearchBar";
import SelectTechStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";

import {useSelectTechStack} from "../../hooks/useSelectTechStack.ts";

const TechStack = () => {
	const { selected,  search, setSearch, select, remove,filteredSearch } = useSelectTechStack();
	return (
		<div className="w-full flex flex-col gap-4 p-4 border border-gray-300 rounded-xl">
			<SearchBar value={search} onChange={setSearch} />
			<SelectTechStack selected={selected} onRemove={remove} />
			<TechStackLabel
				stacks={filteredSearch}
				selected={selected}

				onToggle={select}
			/>
		</div>
	);
};

export default TechStack;