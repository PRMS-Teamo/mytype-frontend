import { useState, useEffect, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import Message from "./Message";
import type { UserInfo } from "./ChatTab";

interface ChatMessage {
  id: number;
  type: "me" | "other";
  text: string;
}

interface ChatRoomProps {
  user: UserInfo;
}

export default function ChatRoom({ user }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, type: "other", text: `안녕하세요, ${user.name}입니다!` },
  ]);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "me", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-2 py-3 pr-0">
        {messages.map((msg) => (
          <Message key={msg.id} type={msg.type} text={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="h-[40px] px-4 py-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메세지를 입력해주세요."
          className="w-[255px] h-[35px] px-4 rounded-3xl text-sm focus:outline-none bg-[#F7F7F7]"
        />
        <button
          type="submit"
          className="text-[#5D5FEF] text-lg hover:opacity-80"
        >
          <LuSendHorizontal strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
