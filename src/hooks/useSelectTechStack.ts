import type { TechStackType } from '../model/TeckStack';
import {useState,useMemo} from "react";
import { techStackMock } from "../mock/data/techStackMock.ts"

export const useSelectTechStack = () => {
		const [selected, setSelected] = useState<TechStackType[]>([]);
		const [search, setSearch] = useState<string>('');

		const select=(i:TechStackType) => {
			setSelected((prev)=>prev.some((v)=>v.id===i.id) ? prev.filter((v)=>v.id!==i.id) : [...prev, i]);
		}

		const  remove=(id:number)=>{
			setSelected((prev)=>prev.filter((v)=>v.id!==id));
		}
	const filteredSearch = useMemo(() => {
		if (!search.trim()) return techStackMock.techStack;
		return techStackMock.techStack.filter((stack) =>
			stack.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search]);
	return {
	selected, setSelected, search, setSearch, select, remove,filteredSearch
}
}