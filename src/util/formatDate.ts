export const formatDate=(date:Date)=>{
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'Asia/Seoul'
	};
	return new Intl.DateTimeFormat('ko-KR', options).format(date);

}