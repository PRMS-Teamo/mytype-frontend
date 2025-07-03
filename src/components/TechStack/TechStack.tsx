import SearchBar from "../SearchBar";
import SelectTackStack from "./SelectTechStack";
import TechStackLabel from "./TechStackLabel";

const TechStack=()=>{

	return (
		<div className="w-full flex flex-col gap-3 box-border p-4 border border-gray-300 rounded-xl">
			<SearchBar/>
			<SelectTackStack/>
			<TechStackLabel/>
		</div>
	)
}
export default TechStack;