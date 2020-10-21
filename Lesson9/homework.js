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

}

console.log( getTimeToDate(newYear, startDate) );
