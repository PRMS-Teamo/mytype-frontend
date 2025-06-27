import {formatDate} from "../../util/formatDate.ts";

const Post=()=>{
	const date=new Date()
	return(
			<div>
				<div className="text-main text-[0.9375rem]">{formatDate(date)}</div>
				<div className="text-2xl font-bold text-black mt-4">제목</div>
				<div className="text-[0.9375rem] text-gray mt-7">내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구  내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구 내용이 어쩌구 저쩌구 저쩌구  </div>
			</div>

	)
}
export default Post;