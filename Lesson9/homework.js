const newYear = new Date(2020, 12, 31, 24, 0, 0);
const startDate = new Date(2020, 11, 30, 14, 0, 0);

/**
 * @param {*} eventDate
 * @param {*} [startDate=new Date()]
 *
 * @return {
 *  years,
 *  monthes: Количество месяцев (number)
 *  days: Количество дней (number),
 *  housr,
 *  minutes,
 *  seconds,
 *  asString: (string) '1 месяц 2 часа 2 секунды'
 * }
 *
 * d.getTime()
 */
function getTimeToDate(eventDate, startDate = new Date()) {
    const diffInMS = eventDate.getTime() - startDate.getTime();

    if (diffInMS < 0) {
        return {
            error: 'wrong date'
        };
    }

    const tempDate = new Date(eventDate);
    const diffInSec = Math.round(diffInMS/1000);
    const MIN_SEC = 60;
    const HOUR_SEC = MIN_SEC * 60;
    const DAYS_SEC = HOUR_SEC * 24;
    const eventYear = eventDate.getFullYear();
    const startYear = startDate.getFullYear();
    let yearDiff = eventYear - startYear;
    let monthDiff = eventDate.getMonth() - startDate.getMonth();
    let daysDiff = eventDate.getDate() - startDate.getDate();

    // 01.01.2021 -> 01.01.2020 -> 01.12.2020
    // 28.12.2020
    // yearDiff = 0
    // monthDiff = 0
    // daysDiff = -27 + 31 = 4

    // 29.04.2020
    // 28.02.2020
    // yearDiff = 0
    // monthDiff = 2

    if (eventYear > startYear) {

        tempDate.setFullYear( startYear );

        if (tempDate < startDate) {
            yearDiff -= 1;
            monthDiff += 12;
        }
    }

    tempDate.setFullYear( eventYear - yearDiff );
    tempDate.setMonth( eventDate.getMonth() - monthDiff);

    if (tempDate < startDate) {
        monthDiff -=1;

        const d = new Date(tempDate);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);

        const daysInMonth = d.getDate();

        daysDiff += daysInMonth;

        tempDate.setMonth( eventDate.getMonth() - monthDiff);
    }

    return diffInMS;
}

console.log( getTimeToDate(newYear, startDate) );
