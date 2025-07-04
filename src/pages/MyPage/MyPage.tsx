import { useEffect } from "react";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import DropDown from "../../components/DropDown";
import { DROPDOWN_OPTIONS } from "../../constants/dropdownOptions/dropdownOptions.ts";
import Profile from "../../components/Profile";
import TechStack from "../../components/TechStack";
import { useUserStore } from "../../store/userStore.ts";
import { useMockUser } from "../../hooks/useMockUser";
import Introduction from "../../components/Introduction";

const MyPage = () => {
	const { user, setUser } = useUserStore();
	const { fetchUserInfo } = useMockUser();

	useEffect(() => {
		if (!user) return;

		const loadUserInfo = async () => {
			const userData = await fetchUserInfo();
			if (userData) {
				setUser(userData);
			}
		};

		loadUserInfo();
	}, [user?.id]);

	return (
		<>
			<Profile />?
			<div className="flex flex-row w-full gap-12 mt-6 justify-center">
				<div className="flex flex-col w-1/3  gap-2">
					<Label>이름</Label>
					<InputText
						placeholder="이름 입력"
						inputSize="small"
						value={user?.nickname ?? ''}
						onChange={(e) => {
							if (!user) return;
							setUser({ ...user, nickname: e.target.value });
						}}
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>지역</Label>
					<InputText
						placeholder="지역 입력"
						inputSize="small"
						value={user?.region ?? ''}
						onChange={(e) => {
							if (!user) return;
							setUser({ ...user, region: e.target.value });
						}}
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>깃허브</Label>
					<InputText
						placeholder="깃허브(아이디) 입력"
						inputSize="small"
						value={user?.github ?? ''}
						onChange={(e) => {
							if (!user) return;
							setUser({ ...user, github: e.target.value });
						}}
					/>
				</div>
			</div>

			<div className="flex flex-row gap-12 mt-5 justify-center">
				<div className="flex flex-col w-1/3 gap-2">
					<Label>새싹 여부</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.BEGINNER}
						value={
							user?.beginner === true
								? 'O'
								: user?.beginner === false
									? 'X'
									: ''
						}
						onChange={(value) => {
							if (!user) return;
							setUser({
								...user,
								beginner:
									value === 'O' ? true : value === 'X' ? false : undefined,
							});
						}}
						placeholder="새싹 여부"
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>진행방식</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.PROCEED}
						value={user?.proceedMethod ?? ''}
						onChange={(value) => {
							if (!user) return;
							setUser({ ...user, proceedMethod: value });
						}}
						placeholder="진행방식"
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>포지션</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.POSITION}
						value={user?.position ?? ''}
						onChange={(value) => {
							if (!user) return;
							setUser({ ...user, position: value });
						}}
						placeholder="포지션"
					/>
				</div>
			</div>

			<div className="flex flex-row gap-12 justify-center mt-5">
				<div className="flex w-full flex-col gap-2">
					<Label>기술 스택</Label>
					<TechStack  />
				</div>
			</div>
			<div className="flex flex-row gap-12 justify-center mt-5">
				<div className="flex w-full flex-col gap-3">
					<Label>자기소개</Label>
			<Introduction />

				</div>
			</div>
		</>
	);
};

export default MyPage;