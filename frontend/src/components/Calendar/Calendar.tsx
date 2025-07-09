
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState, useCallback } from 'react';
import { formatCalendar } from '../../util/formatDate';
import DateBox from '../DateBox/DateBox';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type CalendarModalProps = {
	value: string;
	onChange: (date: string) => void;
};

const CalendarModal = ({ value, onChange }: CalendarModalProps) => {
	const [calendarValue, setCalendarValue] = useState<Value>(new Date());
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const onChangeCalendar = useCallback((nextValue: Value) => {
		setCalendarValue(nextValue);
		if (!Array.isArray(nextValue)) {
			onChange(formatCalendar(nextValue));
			closeModal();
		}
	}, [onChange]);

	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<DateBox dateText={value} onClick={openModal} />

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" onClick={closeModal}>
					<div className="bg-white p-6 rounded-lg shadow-lg w-fit" onClick={(e) => e.stopPropagation()}>
						<Calendar
							onChange={onChangeCalendar}
							value={calendarValue}
							selectRange={false}
							formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
						/>
						<button onClick={closeModal} className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
							닫기
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CalendarModal;