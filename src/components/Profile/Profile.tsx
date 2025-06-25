import Example from "../../assets/icons/image23.png";
import Camera from "../../assets/icons/Camera.svg?react";

const Profile = () => {
	return (
		<div className="flex justify-center">
			<div className="relative w-64 h-64">
				<img src={Example} alt="example" className="rounded-full w-full h-full object-cover border" />
				<div className="absolute bottom-3 right-7 flex items-center cursor-pointer p-1 rounded-full bg-[#F1F1F1]">
					<Camera />
				</div>
			</div>
		</div>
	);
};

export default Profile;