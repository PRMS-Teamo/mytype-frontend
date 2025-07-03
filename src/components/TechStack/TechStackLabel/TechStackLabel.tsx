import {techStackMock} from "../../../mock/data/techStackMock.ts";
const TechStackLabel = () => {
	return (
		<div className="grid grid-cols-8 gap-2">
			{techStackMock.techStack.map((stack) => (
				<div
					key={stack.id}
					className="w-full h-10 flex items-center justify-center rounded-full border border-main"
				>
					{stack.name}
				</div>
			))}
		</div>
	);
};
export default TechStackLabel;