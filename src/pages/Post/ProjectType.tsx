import {POST_TEAM} from "../../constants/post/post.ts"

const ProjectType=()=>{

	return(
<div className="flex mt-12 gap-12">
	<div className=" gap-3 flex flex-col text-main font-bold">
				{Object.entries(POST_TEAM).map(([_, value]) => (
					<div>{value}</div>
))}
			</div>
	<div className="text-black gap-3 flex flex-col" >
		<div>온라인</div>
		<div>리액트</div>
		<div>동작구</div>
		<div className="flex gap-3">
			<p className="font-bold">프론트엔드</p>
			<p>0 / 2</p>
			<p className="font-bold">백엔드</p>
			<p>3 / 4</p></div>

	</div>
</div>
	)
}
export default ProjectType;