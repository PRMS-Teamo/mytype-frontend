import { useParams } from "react-router-dom";
import Button from "../Button";
import { commentMock } from "../../mock/data/commentMock";

export default function Comments() {
  const { id } = useParams();
  const postId = Number(id);

  const filteredComments = commentMock.filter(
    (comment) => comment.postId === postId
  );

  return (
    <div className="w-full max-w-[1300px] flex flex-col gap-4 mt-10">
      {filteredComments.map((comment) => (
        <div
          key={comment.id}
          className="flex justify-between items-center bg-white border rounded-lg p-6 w-full"
        >
          <div className="flex flex-col items-start">
            <span className="text-base font-semibold">{comment.authorName}</span>
            <div className="mt-2 w-[78px] h-[26px] border border-main text-main text-xs flex items-center justify-center rounded-full">
              {comment.position}
            </div>
          </div>

          <div className="flex-1 px-6 text-sm text-gray-800 break-words">
            {comment.content}
          </div>

          <div className="flex gap-2">
            <Button variant="primary" onClick={() => {}}>수락</Button>
            <Button variant="primaryGray" onClick={() => {}}>거절</Button>
          </div>
        </div>
      ))}

      {filteredComments.length === 0 && (
        <div className="text-center text-gray-500 mt-4">아직 댓글이 없습니다.</div>
      )}
    </div>
  );
}