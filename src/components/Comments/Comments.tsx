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
                      onClick={() => (onReject ??comment )}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      거절
                    </button>
                  </>
                )}
                {isMe && (
                  <button
                    onClick={() => (onDelete ??comment )}
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