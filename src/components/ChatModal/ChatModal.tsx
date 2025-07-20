import { useChatStore } from "../../store/chatStore";
import NotificationTab from "./NotificationTab";
import ChatTab, { type UserInfo } from "./ChatTab";
import QnaTab from "./QnaTab";
import { IoNotificationsOutline } from "react-icons/io5";
// import { PiChatCircleDots } from "react-icons/pi";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useState } from "react";

export default function ChatModal() {
  const { currentTab, setTab } = useChatStore();
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null); 

  const renderTabContent = () => {
    switch (currentTab) {
      case "notifications":
        return <NotificationTab />;
      case "chat":
        return (
          <ChatTab
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        );
      case "qna":
        return <QnaTab />;
      default:
        return null;
    }
  };

  const getHeaderLabel = () => {
    if (currentTab === "chat" && selectedUser) {
      return `${selectedUser.name}`;
    }
    const tabLabels: Record<typeof currentTab, string> = {
      notifications: "알림",
      chat: "대화 목록",
      qna: "멘토 Q&A",
    };
    return tabLabels[currentTab];
  };

  return (
    <div className="fixed bottom-36 left-6 w-[320px] h-[520px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden border">
      <div className="h-[64px] border-b bg-white px-4 py-2 flex items-center justify-center relative">
        {currentTab === "chat" && selectedUser && (
          <button
            onClick={() => setSelectedUser(null)}
            className="absolute left-4 text-gray-400 text-xl"
          >
            ←
          </button>
        )}
        <span className="text-lg font-bold mt-3">{getHeaderLabel()}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 text-sm space-y-2">
        {renderTabContent()}
      </div>

      <div className="h-[84px] flex justify-center items-center border-t gap-12">
        <button
          onClick={() => setTab("notifications")}
          className={`text-sm font-medium ${
            currentTab === "notifications" ? "text-[#838485]" : "text-[#D6D6D6]"
          }`}
        >
          <IoNotificationsOutline size={24} />
          알림
        </button>
        {/* <button
          onClick={() => setTab("chat")}
          className={`text-sm font-medium ${
            currentTab === "chat" ? "text-[#838485]" : "text-[#D6D6D6]"
          }`}
        >
          <PiChatCircleDots size={24} />
          대화
        </button>
        <button
          onClick={() => setTab("qna")}
          className={`text-sm font-medium ${
            currentTab === "qna" ? "text-[#838485]" : "text-[#D6D6D6]"
          }`}
        >
          <AiOutlineQuestionCircle size={24} />
          Q&A
        </button> */}
      </div>
    </div>
  );
}
