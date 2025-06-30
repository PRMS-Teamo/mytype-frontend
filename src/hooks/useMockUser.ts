import axios from 'axios';
import { useUserStore } from '../store/userStore';

const booleanToString = (value: boolean | null | undefined): string => {
	if (value === true) return 'O';
	if (value === false) return 'X';
	return '';
};

const stringToBoolean = (value: string): boolean | null => {
	if (value === 'O') return true;
	if (value === 'X') return false;
	return null;
};

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

	const saveUser = async () => {
		try {
			const user = useUserStore.getState().user;
			if (!user) return null;

			const res = await axios.put('/api/userInfo', user);
			setUser({...res.data});
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
		booleanToString,
		stringToBoolean,
	};
};