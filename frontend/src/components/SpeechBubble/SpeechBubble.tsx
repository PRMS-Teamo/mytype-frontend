
interface SpeechBubbleProps {
	text: string;
	className?: string;
}

const SpeechBubble = ({ text, className = "" }: SpeechBubbleProps) => {
	return (
		<div className={`relative bg-purple text-white p-4 rounded-xl max-w-xs -mr-24 ${className}`}>
			{text}
			<div
				className="absolute -bottom-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple"
			/>
		</div>
	);
};

export default SpeechBubble;