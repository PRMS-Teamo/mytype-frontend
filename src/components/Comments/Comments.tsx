import { useParams } from "react-router-dom";
import Button from "../Button";
import { useCommentStore } from "../../store/CommentStore";

export default function Comments() {
  const { id } = useParams();
  const postId = Number(id);

  const { getCommentsByPostId, deleteComment } = useCommentStore();
  const filteredComments = getCommentsByPostId(postId);

  const handleAccept = (id: string) => {
    deleteComment(id);
    alert(`팀원을 수락했습니다.`);
  };

  const handleReject = (id: string) => {
    deleteComment(id);
    alert(`신청을 거절했습니다.`);
  };

  return (
    <div className="w-full max-w-[1300px] flex flex-col gap-4 mt-10">
      {filteredComments.map((comment) => (
        <div
          key={comment.id}
          onClick={() => {
            // 상세 페이지 연결 예정
          }}
          className="flex justify-between items-center bg-white border rounded-lg p-6 w-full cursor-pointer hover:bg-gray"
        >
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-semibold">{comment.authorName}</span>
            <div className="mt-2 w-[78px] h-[26px] border border-main text-main text-xs flex items-center justify-center rounded-full">
              {comment.position}
            </div>
          </div>

          <div className="flex-1 px-6 text-sm text-gray-800 break-words">
            {comment.content}
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => handleAccept(comment.id)}
            >
              수락
            </Button>
            <Button
              variant="primaryGray"
              onClick={() => handleReject(comment.id)}
            >
              거절
            </Button>
          </div>
        </div>
      ))}

      {filteredComments.length === 0 && (
        <div className="text-center text-gray mt-4">
          아직 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}