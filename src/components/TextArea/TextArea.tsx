import {PLACEHOLDER} from "../../constants/placeholder/placeholders.ts";
const TextArea=()=>{
		return (
				<textarea
						className="w-full h-48 p-5 border border-gray-300 rounded-xl resize-none"
						placeholder={PLACEHOLDER.CONTENT}
				></textarea>
		);
}

export default TextArea;