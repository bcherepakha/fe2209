function getTimeToDate(eventDate, startDate = new Date())  {
    const diffInMS = eventDate.getTime() - startDate.getTime();
    const diffDate = new Date(diffInMS);

    return diffDate;
}

const newYear = new Date(2020, 12, 31, 24, 0, 0);
const startDate = new Date(2020, 11, 30, 14, 0, 0);

console.log( getTimeToDate(newYear, startDate) ); // 1970-02-02T10:00:00.000Z
