import { formatDate } from "../../util/formatDate";
import type { User } from "../../store/userStore";
import Edit from "../../assets/icons/Edit.svg?react";
import { useUserStore } from "../../store/userStore.ts";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useInviteUser from "../../hooks/useInviteUser";
import usePosition from "../../hooks/usePositions";
import type { TeamResponse } from "../../types/api.ts";

const Content = ({ post }: { post: TeamResponse | User }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { inviteUser } = useInviteUser();
  const { positions } = usePosition();

  const isAuthor =
    user?.id &&
    (("userId" in post && user.id === post.userId) ||
      ("id" in post && user.id === post.id));

			const createdAt = "createdAt" in post ? post.createdAt : "updatedAt" in post ? post.updatedAt : "";

  const handleEditClick = () => {
    navigate("/mypage");
  };

  const handleInvite = () => {
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    const targetId = "id" in post ? post.id : post.userId;
    let positionId = "positionId" in post ? post.positionId : undefined;
    const positionName = "positionName" in post ? post.positionName : undefined;

    if (!positionId && positionName) {
      const matched = positions.find((p) => p.name === positionName);
      positionId = matched?.id;
    }

    if (!positionId) {
      alert("초대할 사용자의 포지션 정보가 없습니다.");
      return;
    }

    inviteUser(targetId, positionId, {
      message: "우리 팀에 오실래요?",
      apply_status: "SUBMITTED",
      teamPositionId: positionId,
      action: "INVITE",
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-main text-[0.9375rem]">
          {createdAt ? formatDate(new Date(createdAt)) : ""}
        </div>
        {isAuthor ? (
          <div className="flex gap-3">
            <Edit
              onClick={handleEditClick}
              className="cursor-pointer hover:bg-gray"
            />
          </div>
        ) : (
          <Button variant="square" onClick={handleInvite}>
            초대하기
          </Button>
        )}
      </div>

      <div className="text-2xl font-bold text-black mt-4">
        {"title" in post ? post.title : `${post.nickname}`}
      </div>

      <div className="text-[0.9375rem] text-gray mt-7">
        {"content" in post ? post.content : post.description}
      </div>
    </>
  );
};

export default Content;