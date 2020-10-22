function getTimeToDate(eventDate, startDate = new Date())  {
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
    const MONTH_SEC = 30*DAYS_SEC;
    const YEAR_SEC = 365*DAYS_SEC;
    let tempDiff;

    const yearDiff = Math.floor(diffInSec / YEAR_SEC);
    tempDiff = diffInSec % YEAR_SEC;
    const monthDiff = Math.floor(tempDiff / MONTH_SEC);
    tempDiff = tempDiff % MONTH_SEC;
    const daysDiff = Math.floor(tempDiff / DAYS_SEC);

}
