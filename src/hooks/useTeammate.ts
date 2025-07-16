
import axios from "axios";
import {useTeammateStore} from "../store/teammateStore.ts";
import {type User, useUserStore} from "../store/userStore.ts";
import {useEffect} from "react";

const useTeammate=()=> {
	const {setTeammates}=useTeammateStore();
	const {user} = useUserStore();
	const getTeammates = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const publicUsers = res.data.users.filter((user: User) => user.isPublic===true);
			setTeammates(publicUsers);
		} catch (error) {
			console.error("팀원 불러오기 실패", error);
		}
	};
	useEffect(() => {
		getTeammates();
	}, [user?.id]);

	const getTeammateById = async (id: string) => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return res.data as User;
		} catch (error) {
			console.error("팀원 개별 조회 실패", error);
			throw error;
		}
	};

return{
	getTeammates,
	getTeammateById,
}
}

export default useTeammate;