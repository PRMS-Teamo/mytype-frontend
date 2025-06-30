import { useReadStateStore } from "../../store/readStore";

interface Notification {
  id: number;
  postTitle: string;
  authorName: string;
  content: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    postTitle: "프론트 고수 구합니다.",
    authorName: "신혜민",
    content: "잘 못하지만 열심히 할게요ㅠㅠ",
  },
  {
    id: 2,
    postTitle: "프론트 고수 구합니다.",
    authorName: "김희영",
    content: "저 완전 고수임. 혼자 100인분 개발 가능입니다.",
  },
];

export default function NotificationTab() {
  const { isRead, markAsRead } = useReadStateStore();

  return (
    <div className="p-1">
      <div className="space-y-2">
        {mockNotifications.map((item) => {
          const key = `notification-${item.id}`;
          const isItemRead = isRead(key);

          return (
            <div
              key={item.id}
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
                    {item.postTitle}
                  </span>
                  <span className="font-semibold text-[11px] text-[#B3B3B3]">
                    {item.authorName}
                  </span>
                </div>
                <div
                  className={`mt-2 text-xs truncate max-w-[180px] ${
                    isItemRead ? "text-[#A7A7A7]" : "text-gray-500"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
