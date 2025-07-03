import {IoSearch} from "react-icons/io5";
import React from "react";

const SearchBar = () => {
	const handleKeyDown =(e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			console.log('검색어:', e.currentTarget.value);
		}
	}
	return(

		<div className="flex max-w-56 h-10 gap-1 items-center  rounded-full bg-[#F4F7FE] px-4 text-[#8F9BBA] text-sm">
			<IoSearch className="text-[#2B3674] text-sm mr-1 ml-1" />
			<input placeholder="검색" className=" focus:outline-none  bg-[#F4F7FE] text-black" onKeyDown={handleKeyDown}
			/>
		</div>

	)
}

export default SearchBar;