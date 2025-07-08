// components/CalendarModal/CalendarModal.tsx
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState, useCallback, useEffect } from 'react';
import { formatCalendar } from '../../util/formatDate';
import DateBox from '../DateBox/DateBox';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarModal = () => {
	const [calendarValue, setCalendarValue] = useState<Value>(new Date());
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const onChangeCalendar = useCallback((nextValue: Value) => {
		setCalendarValue(nextValue);
		if (!Array.isArray(nextValue)) {
			setSelectedDate(formatCalendar(nextValue));
			closeModal();
		}
	}, []);

	// ESC 키로 모달 닫기
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	return (
		<div className="flex flex-col gap-4 items-center justify-center ">
			{/* 날짜 표시 + 아이콘 (누르면 모달 열림) */}
			<DateBox dateText={selectedDate} onClick={openModal} />

			{/* 모달 */}
			{isOpen && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
					onClick={closeModal}
				>
					<div
						className="bg-white p-6 rounded-lg shadow-lg w-fit"
						onClick={(e) => e.stopPropagation()}
					>
						<Calendar
							onChange={onChangeCalendar}
							value={calendarValue}
							selectRange={false}
							formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
						/>
						<button
							onClick={closeModal}
							className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
						>
							닫기
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CalendarModal;