import React, { useState } from "react";
import Refresh from "../../assets/icons/refresh.svg?react";
import ImageSelectModal from "../ImageSelectModal/ImageSelectModal";

interface ProfileProps {
  profileImageUrl?: string;
  onImageChange?: (imageUrl: string) => void;
}

const Profile: React.FC<ProfileProps> = ({
  profileImageUrl,
  onImageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    if (onImageChange) {
      onImageChange(imageUrl);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          <img
            src={profileImageUrl || "/src/assets/icons/image23.png"}
            alt="profile"
            className="rounded-full w-full h-full object-cover border"
          />
          <div
            className="absolute -bottom-1 -right-1 flex items-center cursor-pointer p-1 hover:bg-gray-100 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <Refresh />
            <span className="text-gray20 text-sm">변경</span>
          </div>
        </div>
      </div>

      <ImageSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleImageSelect}
        currentImageUrl={profileImageUrl}
      />
    </>
  );
};

export default Profile;
