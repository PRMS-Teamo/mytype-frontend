interface MessageProps {
  type: 'me' | 'other';
  text: string;
}

export default function Message({ type, text }: MessageProps) {
  const isMe = type === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2 px-2`}>
      <div
        className={`max-w-[65%] px-4 py-3 rounded-xl break-words text-xs font-normal ${
          isMe
            ? 'bg-[#5932EA] text-white'
            : 'bg-[#F7F7F7] text-black'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
