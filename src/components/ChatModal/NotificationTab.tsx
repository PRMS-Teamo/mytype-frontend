import { useReadStateStore } from "../../store/readStore";
import useAppliesHistory from "../../hooks/useInvitations";

export default function NotificationTab() {
  const { isRead, markAsRead } = useReadStateStore();
  const { invitations } = useAppliesHistory(); 

  
  return (
    <div className="p-1">
      <div className="space-y-2">
        {invitations.map((item, index) => {
          const key = `notification-${index}`;
          const isItemRead = isRead(key);

          return (
            <div
              key={index}
              onClick={() => markAsRead(key)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray rounded-lg p-1.5"
            >
              <div className="w-12 h-12 rounded-full bg-gray flex-shrink-0" />
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold text-sm ${
                      isItemRead ? "text-[#A7A7A7]" : "text-black"
                    }`}
                  >
                    {item.postTitle ?? "게시글 제목 없음"}
                  </span>
                  <span className="font-semibold text-[11px] text-[#B3B3B3]">
                    {item.authorName ?? "작성자 없음"}
                  </span>
                </div>
                <div
                  className={`mt-2 text-xs truncate max-w-[180px] ${
                    isItemRead ? "text-[#A7A7A7]" : "text-gray-500"
                  }`}
                >
                  {item.message ?? "내용 없음"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}