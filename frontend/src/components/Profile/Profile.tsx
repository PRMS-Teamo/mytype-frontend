import Example from "../../assets/icons/image23.png";
import Refresh from "../../assets/icons/refresh.svg?react";

const Profile = () => {
	return (
		<div className="flex justify-center">
			<div className="relative w-64 h-64 ">
				<img src={Example} alt="example" className="rounded-full w-full h-full object-cover border" />
				<div className="absolute -bottom-1  -right-1 flex items-center cursor-pointer p-1">
					<Refresh/>
					<span className="text-gray20 text-sm">변경</span>
				</div>
			</div>
		</div>
	);
};

export default Profile;