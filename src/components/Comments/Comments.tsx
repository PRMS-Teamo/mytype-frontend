// import { useParams } from "react-router-dom";
// import Button from "../Button";
// import { useCommentStore } from "../../store/CommentStore";
//
// export default function Comments() {
//   const { id } = useParams();
//   const postId = Number(id);
//
//   const { getCommentsByPostId, deleteComment } = useCommentStore();
//   const filteredComments = getCommentsByPostId(postId);
//
//   const handleAccept = (id: string) => {
//     deleteComment(id);
//     alert(`팀원을 수락했습니다.`);
//   };
//
//   const handleReject = (id: string) => {
//     deleteComment(id);
//     alert(`신청을 거절했습니다.`);
//   };
//
//   return (
//     <div className="w-full max-w-[1300px] flex flex-col gap-4 mt-10">
//       {filteredComments.map((comment) => (
//         <div
//           key={comment.id}
//           onClick={() => {
//             // 상세 페이지 연결 예정
//           }}
//           className="flex justify-between items-center bg-white border rounded-lg p-6 w-full cursor-pointer hover:bg-gray"
//         >
//           <div className="flex flex-col items-center text-center">
//             <span className="text-lg font-semibold">{comment.authorName}</span>
//             <div className="mt-2 w-[78px] h-[26px] border border-main text-main text-xs flex items-center justify-center rounded-full">
//               {comment.position}
//             </div>
//           </div>
//
//           <div className="flex-1 px-6 text-sm text-gray-800 break-words">
//             {comment.content}
//           </div>
//
//           <div className="flex gap-2">
//             <Button
//               variant="primary"
//               onClick={() => handleAccept(comment.id)}
//             >
//               수락
//             </Button>
//             <Button
//               variant="primaryGray"
//               onClick={() => handleReject(comment.id)}
//             >
//               거절
//             </Button>
//           </div>
//         </div>
//       ))}
//
//       {filteredComments.length === 0 && (
//         <div className="text-center text-gray mt-4">
//           아직 댓글이 없습니다.
//         </div>
//       )}
//     </div>
//   );
// }


type ApplyStatus = "SUBMITTED" | "ACCEPTED" | "REJECTED";
type ApplyAction = "APPLY" | "INVITE";

type Position = {
  positionId: string;
  positionName: string;
};

type Team = {
  teamId: string;
  title: string;
  recruitStatus: string;
};

type TeamPosition = {
  teamPositionId: string;
  team: Team;
  position: Position;
};

export type CommentData = {
  userId: string;
  message: string;
  applyStatus: ApplyStatus;
  action: ApplyAction;
  createdAt: string;
  updatedAt: string;
  reply: string;
  isRead: boolean;
  teamPosition: TeamPosition;
};

type Props = {
  comments: CommentData[];
  currentUserId?: string;
  teamOwnerId?: string;
  onAccept?: (comment: CommentData) => void;
  onReject?: (comment: CommentData) => void;
  onDelete?: (comment: CommentData) => void;
};

export default function Comments({
                                               comments,
                                               currentUserId,
                                               teamOwnerId,
                                               onAccept,
                                               onReject,
                                               onDelete,
                                             }: Props) {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => {
        const isOwner = currentUserId === teamOwnerId;
        const isMe = currentUserId === comment.userId;
        const isThirdUser = !isOwner

        return (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm bg-white space-y-2"
          >
            <div className="text-sm text-gray-600">
              {comment.teamPosition.position.positionName}

            </div>
            <div className="text-base text-gray-900">{comment.message}</div>


            {!isThirdUser && (
              <div className="flex gap-2 mt-2">
                상태: {comment.applyStatus}
                {isOwner && (
                  <>
                    <button
                      onClick={() => (onAccept ??comment )}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => (onAccept ??comment )}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      거절
                    </button>
                  </>
                )}
                {isMe && (
                  <button
                    onClick={() => (onAccept ??comment )}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    삭제
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}