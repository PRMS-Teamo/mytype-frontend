import InputText from "../../components/InputText";
import {useState} from "react";
import Label from "../../components/Label";
import DropDown from "../../components/DropDown";
import {DROPDOWN_OPTIONS} from "../../constants/dropdownOptions/dropdownOptions.ts";
import Profile from "../../components/Profile";
import TechStack from "../../components/TechStack";
import Button from "../../components/Button/Button.tsx";

const MyPage=()=>{
	const [name,setName]=useState("");
	const [beginner, setBeginner] = useState("");
	const [proceed,setProceed]=useState("");
	return(
		<div className="m-12">
			<div className="relative w-full">
				<div className="absolute right-0 top-0">
					<Button  variant="primary" onClick={()=>console.log("저장") }>저장</Button>
				</div>
				<div className="flex justify-center">
					<Profile />
				</div>
			</div>
		<div className="flex flex-row gap-12  mt-6 justify-center">
		<div className="flex flex-col gap-3">
			<Label>이름</Label>
			<InputText
				placeholder="이름 입력"
				inputSize="small"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	<div className="flex flex-col gap-3">
		<Label>지역</Label>
		<InputText
			placeholder="지역 입력"
			inputSize="small"
			value={name}
			onChange={(e) => setName(e.target.value)}
		/>
	</div>
	<div className="flex flex-col gap-3">
		<Label>깃허브</Label>
		<InputText
			placeholder="깃허브(아이디) 입력"
			inputSize="small"
			value={name}
			onChange={(e) => setName(e.target.value)}
		/>
	</div>
		</div>
	<div className="flex flex-row gap-12 mt-3 justify-center">
		<div className="flex flex-col gap-3">
			<Label>새싹 여부</Label>
			<DropDown options={DROPDOWN_OPTIONS.BEGINNER} onChange={setBeginner} placeholder="새싹 여부"
			          value={beginner}/>
		</div>
		<div className="flex flex-col gap-3">
			<Label>진행방식</Label>
			<DropDown options={DROPDOWN_OPTIONS.PROCEED} onChange={setProceed} placeholder="진행방식"
			          value={proceed}/>
		</div>
		<div className="flex flex-col gap-3">
			<Label>포지션</Label>
			<DropDown options={DROPDOWN_OPTIONS.BEGINNER} onChange={setBeginner} placeholder="포지션"
			value={beginner}/>
		</div>
	</div>
			<div className="flex flex-row gap-12 justify-center mt-3 ">
				<div className="flex flex-col gap-3">
				<Label>기술 스택</Label>
				<TechStack  />
			</div>
			</div>
		</div>
	)
}

export default MyPage;