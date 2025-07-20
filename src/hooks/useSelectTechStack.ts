import type { TechStackType } from '../model/TeckStack';
import { useState, useMemo } from "react";
import { techStackMock } from "../mock/data/techStackMock.ts";

export const useSelectTechStack = (initial: TechStackType[] = []) => {
	const [selected, setSelected] = useState<TechStackType[]>(initial);
	const [search, setSearch] = useState("");

	const select = (stack: TechStackType) => {
		setSelected((prev) =>
			prev.some((s) => s.id === stack.id)
				? prev.filter((s) => s.id !== stack.id)
				: [...prev, stack]
		);
	};

	const remove = (id: string) => {
		setSelected((prev) => prev.filter((s) => s.id !== id));
	};

	const filteredSearch = useMemo(() => {
		if (!search.trim()) return techStackMock.techStack;
		return techStackMock.techStack.filter((s) =>
			s.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search]);

	return {
		selected,
		search,
		setSearch,
		select,
		remove,
		filteredSearch,
	};
};