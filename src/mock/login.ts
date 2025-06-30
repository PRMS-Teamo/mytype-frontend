
	import { http, HttpResponse } from 'msw';
	import { userMock } from './data/userMock.tsx'

	let currentUserType: 'exist' | 'new' | null = null;
	export const userHandlers = [
		http.post('/api/login', async ({ request }) => {
			const body = await request.json() as { userType: 'exist' | 'new' };
			currentUserType= body.userType;

			if (body.userType === 'exist') {
				return HttpResponse.json(userMock.existUser);
			} else if (body.userType === 'new') {
				return HttpResponse.json(userMock.newUser);
			} else {
				return HttpResponse.json({ message: '유효하지 않은 유저 타입' }, { status: 400 });
			}
		}),

		http.get('/api/userInfo', () => {
			if (currentUserType === 'exist') {
				return HttpResponse.json(userMock.existUser);
			} else if (currentUserType === 'new') {
				return HttpResponse.json(userMock.newUser);
			} else {
				return HttpResponse.json({ message: '로그인 정보 없음' }, { status: 401 });
			}
		}),

		http.put('/api/userInfo', async ({ request }) => {
			const updated = await request.json();
			if (currentUserType === 'exist') {
				Object.assign(userMock.existUser, updated);
				return HttpResponse.json(userMock.existUser);
			} else if (currentUserType === 'new') {
				Object.assign(userMock.newUser, updated);
				return HttpResponse.json(userMock.newUser);
			}
			return HttpResponse.json({ message: '로그인 정보 없음' }, { status: 401 });
		}),
	];