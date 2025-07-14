import {useEffect, useState} from "react";
import axios from "axios";

type TechStack={
id:string,
	name:string,
	img:string,
}
const useTechStack = () => {
	const [techStack, setTechStack] = useState<TechStack[]>([]);
	const getTeckStack=async ()=>{
		try {
			const accessToken = localStorage.getItem("accessToken");
			const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stacks`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log("기술스택 응답", res.data);
			const stackArray = res.data.stacks;
			const parsed = stackArray.map((stc: { stackId: string; stackName: string; imageUrl:string }) => ({
				id: stc.stackId,
				name: stc.stackName,
				img:stc.imageUrl,
			}));
			setTechStack(parsed);
		} catch (e) {
			console.error("포지션 목록 가져오기 실패", e);
		}
	};
	useEffect(() => {
		getTeckStack();
	}, []);

	return {
		techStack,
	};
}

export default useTechStack;