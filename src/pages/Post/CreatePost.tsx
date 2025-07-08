
import {POST_CREATE} from "../../constants/post/post.ts"
import Button from "../../components/Button/Button.tsx";
import Label from "../../components/Label";
import InputText from "../../components/InputText";
import {PLACEHOLDER} from "../../constants/placeholder/placeholders.ts";
import TextArea from "../../components/TextArea";
import TechStack from "../../components/TechStack";
import PositionBtn from "../../components/PositionBtn";
import {formatNumber} from "../../util/formatNumber.ts";
import Calendar from "../../components/Calendar/Calendar.tsx";
import ProceedMethod from "../../components/ProceedMethod";

const CreatePost = () => {

	return(
		<div className="border border-gray-300 rounded-lg mt-6 mb-10 py-2 px-8 h-auto">
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
				<div className="text-black font-bold text-2xl">게시글 작성</div>
				<Button variant="primary" onClick={()=> console.log("저장")
				}>작성하기</Button>
			</div>

				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.TITLE_LABEL}</Label>
					<InputText placeholder={PLACEHOLDER.TITLE} inputSize="medium" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.CONTENT_LABEL}</Label>
						<TextArea/>
				</div>
				<div>
					<Label>{POST_CREATE.RECRUITMENT_FIELD_LABEL}</Label>
					<PositionBtn/>
				</div>
				<div className="flex flex-col gap-2">
					<Label>{POST_CREATE.RECRUITMENT_COUNT_LABEL}</Label>
					<div className="inline-flex"><InputText placeholder="인원" inputSize="small" type="text" onInput={(e)=>{
						e.currentTarget.value =formatNumber(e.currentTarget.value)
					}}/>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.TECH_STACK_LABEL}</Label>
					<TechStack />
				</div>
				<div className="flex gap-5 w-full mb-5 ">
					<div className="flex  flex-col  gap-2" >
						<Label>{POST_CREATE.PROCEED_METHOD_LABEL}</Label>
						<ProceedMethod/>
					</div>
					<div className="flex flex-col gap-2" >
						<Label>{POST_CREATE.REGION_LABEL}</Label>
						<InputText placeholder='지역' inputSize="tiny" />
					</div>
					<div className="flex flex-col gap-2" >
						<Label>{POST_CREATE.DEADLINE_LABEL}</Label>
						<Calendar/>
					</div>

				</div>

			</div>

		</div>
	)
}

export default CreatePost;