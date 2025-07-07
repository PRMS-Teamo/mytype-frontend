import type { TechStackType } from '../model/TeckStack';
import { useState, useMemo, useEffect } from "react";
import { techStackMock } from "../mock/data/techStackMock.ts";
import { useUserStore } from "../store/userStore";

export const useSelectTechStack = () => {
	const [selected, setSelected] = useState<TechStackType[]>([]);
	const [search, setSearch] = useState<string>('');
	const { user, setUser } = useUserStore();

	useEffect(() => {
		if (user?.techStack) {
			const matched = techStackMock.techStack.filter((stack) =>
				user.techStack.includes(stack.name)
			);
			setSelected(matched);
		} else {
			setSelected([]);
		}
	}, [user]);


	const select = (i: TechStackType) => {
		setSelected((prev) => {
			const updated = prev.some((v) => v.id === i.id)
				? prev.filter((v) => v.id !== i.id)
				: [...prev, i];
			if (user) {
				setUser({
					...user,
					techStack: updated.map((v) => v.name),
				});
			}
			return updated;
		});
	};

	const remove = (id: number) => {
		setSelected((prev) => {
			const updated = prev.filter((v) => v.id !== id);
			if (user) {
				setUser({
					...user,
					techStack: updated.map((v) => v.name),
				});
			}

			return updated;
		});
	};

	const filteredSearch = useMemo(() => {
		if (!search.trim()) return techStackMock.techStack;
		return techStackMock.techStack.filter((stack) =>
			stack.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search]);

	return {
		selected,
		setSelected,
		search,
		setSearch,
		select,
		remove,
		filteredSearch
	};
};