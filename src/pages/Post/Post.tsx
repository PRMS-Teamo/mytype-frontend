
import Content from "./Content.tsx";
import ProjectType from "./ProjectType.tsx";

const Post=()=>{
	return(
		<div className="border border-gray-300 rounded-lg ">
		<div className="m-12">
			<Content/>
			<ProjectType/>
		</div>
		</div>
	)
}
export default Post;