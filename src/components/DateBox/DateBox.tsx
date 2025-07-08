import Calendar from "../../assets/icons/Calendar.svg?react"
type Props = {
	dateText: string;
	onClick: () => void;
};


const DateBox = ({ dateText,onClick }: Props) => {
	return (
		<button onClick={onClick} className=" flex gap-20  h-10 text-base rounded-lg border border-gray-300 px-4 py-2">
			<span className={dateText? "" : "text-gray20"}>{dateText || '날짜를 선택하세요'}</span>
			<Calendar/>
		</button>
	);
};

export default DateBox;