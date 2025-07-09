import { useChatStore } from "../../store/chatStore";
import ChatModal from "./ChatModal";
import TeamoChar from "../../assets/images/Teamochar.png";

export default function ToggleModal() {
  const { isOpen, toggleChat } = useChatStore();

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 left-6 w-[92px] h-[92px] rounded-full border border-black shadow-[0_4px_8px_rgba(0,0,0,0.2)] bg-white flex items-center justify-center z-50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] hover:brightness-95 transition"
      >
        <img
          src={TeamoChar}
          alt="TeamoChar img"
          className="w-[88px] h-[88px]"
        />
      </button>
      {isOpen && <ChatModal />}
    </>
  );
}
