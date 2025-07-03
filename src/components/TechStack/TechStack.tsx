interface TechStackProps {
techStackSize:'full'|'half';
}
const techStackSizes={
	full:'w-full',
	half:'w-[50rem]',
}
const TechStack =({techStackSize}:TechStackProps)=>{
	const sizeClass=techStackSizes[techStackSize];
	return (
		<div className={`${sizeClass} h-56 border border-gray-300 rounded-xl`}>기술 스택</div>
	)
}
export default TechStack;