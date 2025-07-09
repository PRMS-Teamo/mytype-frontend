import { useState, useRef, useEffect } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import Message from "./Message";

interface MessageType {
  id: number;
  type: "me" | "other";
  text: string;
}

export default function QnaTab() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = (text: string) => {
    const newMessage: MessageType = {
      id: Date.now(),
      type: "me",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "other",
          text: "멘토님께 전달 예정입니다.\n답변은 순차적으로 제공될 예정입니다.",
        },
      ]);
    }, 800);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    sendMessage(trimmed);
    setInput("");

    setTimeout(() => setIsSending(false), 200);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#F3F3F3] rounded-xl px-4 py-2 mb-3 text-xs flex items-center gap-2">
        <span>🔔</span>
        <span>멘토님들께 전달 후 답변을 알려드립니다.</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-1">
          {messages.map((msg) => (
            <Message key={msg.id} type={msg.type} text={msg.text} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="h-[45px] px-4 py-2 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="메세지를 입력해주세요."
          className="w-[255px] h-[35px] px-4 rounded-3xl text-xs focus:outline-none bg-[#F7F7F7]"
        />
        <button
          onClick={handleSend}
          className="text-[#5D5FEF] text-lg hover:opacity-80"
          type="button"
        >
          <LuSendHorizontal strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
