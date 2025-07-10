type IntroductionProps = {
	value:string;
	onChange:(value:string)=>void;
}

const Introduction = ({value,onChange}:IntroductionProps) => {
	return (
	<textarea className="border border-gray-300 rounded-xl w-full min-h-44 p-5" placeholder="본인을 소개해주세요" value={value} onChange={(e) => onChange(e.target.value)}/>
	)
}
export default Introduction