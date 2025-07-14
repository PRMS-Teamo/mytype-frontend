import { useEffect } from "react";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import DropDown from "../../components/DropDown";
import { DROPDOWN_OPTIONS } from "../../constants/dropdownOptions/dropdownOptions.ts";
import Profile from "../../components/Profile";
import TechStack from "../../components/TechStack";
import { useUserStore } from "../../store/userStore.ts";
import Introduction from "../../components/Introduction";
import Information from "../../assets/icons/information.svg?react"
import {MYPAGE} from "../../constants/mypage/mypage.ts";
import Button from "../../components/Button";
import useProfile from "../../hooks/useProfile.ts";
import usePosition from '../../hooks/usePositions.ts'

const MyPage = () => {
	const { user, setUser } = useUserStore();
	const {getUser}=useProfile()
	const {positions}=usePosition()
	useEffect(() => {
		if (!user) return;
		getUser()
	}, [user?.id]);

	const handleTechStackChange = (updatedTechStack: string[]) => {
		if (!user) return;
		setUser({
			...user,
		userStack: updatedTechStack,
		});
	};
	return (
		<>
			<Profile />
			<div className="flex flex-row w-full gap-12 mt-6 justify-center">
				<div className="flex flex-col w-1/3  gap-2">
					<Label>이름</Label>
					<InputText
						placeholder="이름 입력"
						inputSize="medium"
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
						inputSize="medium"
						value={user?.location ?? ''}
						onChange={(e) => {
							if (!user) return;
							setUser({ ...user, location: e.target.value });
						}}
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>깃허브</Label>
					<InputText
						placeholder="깃허브(아이디) 입력"
						inputSize="medium"
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
						value={user?.proceedType ?? ''}
						onChange={(value) => {
							if (!user) return;
							setUser({ ...user, proceedType: value });
						}}
						placeholder="진행방식"
					/>
				</div>
				<div className="flex flex-col w-1/3 gap-2">
					<Label>포지션</Label>
					<DropDown
						options={positions.map((p) => p.name)}
						value={
							positions.find((p) => p.id === user?.position)?.name || ''
						}
						onChange={(name) => {
							if (!user) return;
							const selected = positions.find((p) => p.name === name);
							if (selected) {
								setUser({ ...user, position: selected.id });
							}
						}}
						placeholder="포지션"
					/>
				</div>
			</div>

			<div className="flex flex-row gap-12 justify-center mt-5">
				<div className="flex w-full flex-col gap-2">
					<Label>기술 스택</Label>
					<TechStack value={user?.userStack ?? []} onChange={handleTechStackChange} />
				</div>
			</div>
			<div className="flex flex-row gap-12 justify-center mt-5">
				<div className="flex w-full flex-col gap-3">
					<Label>자기소개</Label>
					<Introduction value={user?.description ?? ''} onChange={(value) => {
						if(!user) return; setUser({...user,description: value});
					}} />
				</div>
			</div>
			<div className="flex flex-row gap-12 items-center  mt-5">
				<div className="flex w-full gap-2 align-middle items-center ">
					<Information />
					{MYPAGE.PUBLIC_OPTIONS}
					{user?.isPublic? (
						<span className="text-main font-bold text-lg">공개 중</span>
					) :
						<span className="font-bold text-lg text-gray">비공개 중</span>}
				</div>
			</div>
			<div className="flex flex-row gap-12 items-center  justify-center mt-5">
				<div className="flex w-full gap-2">
				<Button variant="primary" onClick={()=>{
					if(!user) return;
					setUser({ ...user, isPublic: true });
				}}>공개</Button>
					<Button variant="primaryGray" onClick={()=>{
						if(!user) return;
						console.log(user);
						setUser({ ...user, isPublic: false });
					}}>비공개</Button>
				</div>
			</div>
		</>
	);
};

export default MyPage;