import { useUserStore } from "../../store/userStore";
import Button from "../Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useApplyTeam from "../../hooks/useApplyTeam";

export default function WriteComment() {
  const { user, isLoggedIn } = useUserStore();
  const [comment, setComment] = useState("");
  const { teamId } = useParams<{ teamId: string }>(); // ✅ 올바른 파라미터 이름 사용
  const { applyToTeam } = useApplyTeam();

  if (!isLoggedIn || !user) {
    return (
      <div className="w-full max-w-[1060px] h-auto border rounded-[20px] bg-white p-6 text-center text-gray-500 mt-12">
        로그인 후 이용해주세요
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    if (!teamId) {
      alert("팀 ID가 유효하지 않습니다.");
      return;
    }

    try {
      await applyToTeam(teamId); // ✅ teamId 전달
      setComment("");
      alert("지원에 성공했습니다!");
    } catch (error) {
      console.error("지원 실패", error);
      alert("지원 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full max-w-[1300px] border rounded-lg bg-white p-6 flex flex-col gap-4 mt-12">
      <span className="text-lg font-semibold">{user?.nickname}</span>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between w-full">
        <textarea
          placeholder="간단한 소개를 입력해주세요."
          className="resize-none w-full sm:w-[840px] h-[70px] border border-gray-300 rounded-lg p-4 text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={handleSubmit}
          className="min-w-[96px] sm:w-[96px] h-16"
        >
          지원하기
        </Button>
      </div>
    </div>
  );
}