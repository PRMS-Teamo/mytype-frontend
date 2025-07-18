import { useEffect, useState } from "react";
import axios from "axios";

export type Position = {
	id: string;
	name: string;
};

const usePosition = () => {
	const [positions, setPositions] = useState<Position[]>([]);

	const getPosition = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/positions`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log("포지션 응답", res.data);
			const positionArray = res.data.positions;
			const parsed = positionArray.map((pos: { positionId: string; positionName: string; }) => ({
				id: pos.positionId,
				name: pos.positionName,
			}));
			setPositions(parsed);
		} catch (e) {
			console.error("포지션 목록 가져오기 실패", e);
		}
	};

	useEffect(() => {
		getPosition();
	}, []);

	return {
		positions,
	};
};

export default usePosition;