import { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import DropDown from "../../components/DropDown";
import { DROPDOWN_OPTIONS } from "../../constants/dropdownOptions/dropdownOptions.ts";
import Profile from "../../components/Profile";
import TechStack from "../../components/TechStack";
import { useUserStore } from "../../store/userStore.ts";
import { useMockUser } from "../../hooks/useMockUser";

const MyPage = () => {
	const { user } = useUserStore();
	const { fetchUserInfo, booleanToString } = useMockUser();

	const [profile, setProfile] = useState({
		name: "",
		region: "",
		github: "",
		beginner: "",
		proceed: "",
		position: "",
	});

	const resetProfile = () => {
		setProfile({
			name: "",
			region: "",
			github: "",
			beginner: "",
			proceed: "",
			position: "",
		});
	};

	useEffect(() => {
		if (!user) {
			resetProfile();
			return;
		}


		const loadUserInfo = async () => {
			const userData = await fetchUserInfo();
			if (!userData) {
				resetProfile();
				return;
			}

			setProfile({
				name: userData.nickname,
				region: userData.region,
				github: userData.github,
				beginner: booleanToString(userData.beginner),
				proceed: userData.proceedMethod,
				position: userData.position,
			});
		};

		loadUserInfo();
	}, [user]);
	return (
		<>
			<Profile />
			<div className="flex flex-row gap-12 mt-6 justify-center">
				<div className="flex flex-col gap-3">
					<Label>이름</Label>
					<InputText
						placeholder="이름 입력"
						inputSize="small"
						value={profile.name}
						onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Label>지역</Label>
					<InputText
						placeholder="지역 입력"
						inputSize="small"
						value={profile.region}
						onChange={(e) => setProfile((prev) => ({ ...prev, region: e.target.value }))}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Label>깃허브</Label>
					<InputText
						placeholder="깃허브(아이디) 입력"
						inputSize="small"
						value={profile.github}
						onChange={(e) => setProfile((prev) => ({ ...prev, github: e.target.value }))}
					/>
				</div>
			</div>

			<div className="flex flex-row gap-12 mt-3 justify-center">
				<div className="flex flex-col gap-3">
					<Label>새싹 여부</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.BEGINNER}
						value={profile.beginner}
						onChange={(value) => setProfile((prev) => ({ ...prev, beginner: value }))}
						placeholder="새싹 여부"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Label>진행방식</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.PROCEED}
						value={profile.proceed}
						onChange={(value) => setProfile((prev) => ({ ...prev, proceed: value }))}
						placeholder="진행방식"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Label>포지션</Label>
					<DropDown
						options={DROPDOWN_OPTIONS.POSITION}
						value={profile.position}
						onChange={(value) => setProfile((prev) => ({ ...prev, position: value }))}
						placeholder="포지션"
					/>
				</div>
			</div>

			<div className="flex flex-row gap-12 justify-center mt-3">
				<div className="flex flex-col gap-3">
					<Label>기술 스택</Label>
					<TechStack />
				</div>
			</div>
		</>
	);
};

export default MyPage;