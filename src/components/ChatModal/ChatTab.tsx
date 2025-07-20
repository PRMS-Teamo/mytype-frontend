import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";


export interface UserInfo {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
}

interface ChatTabProps {
  selectedUser: UserInfo | null;
  setSelectedUser: (user: UserInfo | null) => void;
}

export default function ChatTab({ selectedUser, setSelectedUser }: ChatTabProps) {
  return (
    <div className="flex flex-col h-full">
      {selectedUser ? (
        <ChatRoom user={selectedUser} />
      ) : (
        <ChatList onSelectUser={setSelectedUser} />
      )}
    </div>
  );
}

