import type { UserInfo } from "./ChatTab";
import { useReadStateStore } from "../../store/readStore";

interface ChatListProps {
  onSelectUser: (user: UserInfo) => void;
}

const mockUsers: UserInfo[] = [
  {
    id: 1,
    name: "신혜민",
    avatarUrl: "/avatar1.png",
    lastMessage: "고수라고 들었습니다. 저희 팀에 오실래요?",
  },
  {
    id: 2,
    name: "조민우",
    avatarUrl: "/avatar2.png",
    lastMessage: "너네 같은 하수 팀에 안 가",
  },
];

export default function ChatList({ onSelectUser }: ChatListProps) {
  const { isRead, markAsRead } = useReadStateStore();

  return (
    <div className="p-1">
      <div className="space-y-2">
        {mockUsers.map((user) => {
          const key = `chat-${user.id}`;
          const isItemRead = isRead(key);

          return (
            <div
              key={user.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray rounded-lg p-1.5"
              onClick={() => {
                markAsRead(key);
                onSelectUser(user);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gray" />
              <div>
                <div
                  className={`font-bold ${
                    isItemRead ? "text-[#A7A7A7]" : "text-black"
                  }`}
                >
                  {user.name}
                </div>
                <div
                  className={`mt-2 text-xs truncate max-w-[180px] ${
                    isItemRead ? "text-[#A7A7A7]" : "text-gray-500"
                  }`}
                >
                  {user.lastMessage}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
