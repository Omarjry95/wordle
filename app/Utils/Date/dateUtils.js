export const getTodayDateFormatted = () => {
    function getTwoDigitsDate(date) {
        return date.length < 2 ? '0' + date : date;
    }

    const today = new Date();

    const indexedMonth = today.getMonth() + 1;

    let day = getTwoDigitsDate(today.getDate().toString());
    let month = getTwoDigitsDate(indexedMonth.toString());
    let year = today.getFullYear();

    return day + '-' + month + '-' + year;
}