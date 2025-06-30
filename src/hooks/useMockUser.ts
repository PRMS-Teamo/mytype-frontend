import axios from 'axios';
import { useUserStore } from '../store/userStore';
import type {User} from '../store/userStore';


export const useMockUser = () => {
	const setUser = useUserStore((s) => s.setUser);
	const clearUser = useUserStore((s) => s.clearUser);


	const login = async (userType: 'exist' | 'new') => {
		try {
			const res = await axios.post('/api/login', { userType });
			const user = res.data;
			setUser(user);
			return user;
		} catch (err) {
			console.error('로그인 실패', err);
			return null;
		}
	};


	const logout = () => {
		clearUser();
		localStorage.removeItem('user-storage');
	};


	const fetchUserInfo = async () => {
		try {
			const res = await axios.get('/api/userInfo');
			return res.data;
			
		} catch (err) {
			console.error('유저 정보 조회 실패', err);
			return null;
		}
	};

	const saveUser = async (user:User) => {
		try {
			const res = await axios.put('/api/userInfo', user);
			setUser(res.data);
			console.log(res.data);

			return res.data;
		} catch (err) {
			console.error('프로필 저장 실패', err);
			return null;
		}
	};
	return {
		login,
		logout,
		fetchUserInfo,
		saveUser,

	};
};