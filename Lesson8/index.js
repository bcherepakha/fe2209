const currentDate = new Date();

console.log( currentDate );

console.log( getLastDayNumberOfCurrentMonth() );

function getLastDayNumberOfCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    currentDate.setMonth(currentMonth + 1);
    currentDate.setDate(0);

    return currentDate.getDate();
}

// month: 1 - 12
function getLastDayNumberOfMonth(month) {
    const currentDate = new Date();

    currentDate.setMonth(month);
    currentDate.setDate(0);

    return currentDate.getDate();
}

function clearCalendarDysList() {
    const listElement = getCalendarDaysListElement();

    listElement.innerText = '';
}

function makeCalendar(selector, year, month) {
    const MONTH_NAMES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const calendar = {
        year: year,
        month,
        rootEl: document.querySelector(selector),
        clear: function () {
            calendar.daysEl.innerText = '';
            calendar.headerEl.innerText = '';
        },
        fill,
        init
    };

    calendar.headerEl = calendar.rootEl.querySelector('.calendar-header');
    calendar.daysEl = calendar.rootEl.querySelector('.calendar-days');

    calendar.currentDate = new Date();

    if (!year || !month) {
        calendar.year = calendar.currentDate.getFullYear();
        calendar.month = calendar.currentDate.getMonth() + 1;
    }

    calendar.clear();
    calendar.init();
    calendar.fill();

    function getTitle() {
        return MONTH_NAMES[calendar.month - 1] + ' ' + calendar.year;
    }

    function init() {
        calendar.firstDateInMonth = new Date(calendar.year, calendar.month - 1, 1);
        calendar.firstDayInMonth = calendar.firstDateInMonth.getDay();

        // const shiftFirstDay = calendar.firstDayInMonth === 0 ? 6 : calendar.firstDayInMonth - 1;
        const shiftFirstDay = (calendar.firstDayInMonth + 6) % 7;

        calendar.firstDisplayDate = new Date(calendar.year, calendar.month - 1, 1 - shiftFirstDay);

        calendar.lastDateInMonth = new Date(calendar.year, calendar.month, 0);
        calendar.lastDayInMonth = calendar.lastDateInMonth.getDay();

        const lastDayShift = (7 - calendar.lastDayInMonth) % 7;

        calendar.lastDisplayDate = new Date(calendar.year, calendar.month, lastDayShift);

        calendar.displayDates = [];

        for (
            const idxDate = new Date(calendar.firstDisplayDate);
            idxDate <= calendar.lastDisplayDate;
            idxDate.setDate( idxDate.getDate() + 1)
        ) {
            calendar.displayDates.push(new Date(idxDate));
        }
    }

    function fill() {
        calendar.headerEl.innerText = getTitle();

        const daysEl = [];

        for (let i=0; i < calendar.displayDates.length; i++) {
            const dayEl = createDayElement(calendar.displayDates[i], calendar.month - 1);

            daysEl.push(dayEl);
        }

        calendar.daysEl.append(...daysEl);
    }

    function createDayElement(elementDate, curentMonthNumber) {
        const rootElement = document.createElement('li');

        rootElement.innerText = elementDate.getDate();
        rootElement.className = 'calendar-day';
        rootElement.setAttribute('class', 'calendar-day');

        if (elementDate.getMonth() !== curentMonthNumber) {
            rootElement.classList.add('calendar-day--not-in-month');
        }

        return rootElement;
    }

    return calendar;
}

const calendar = makeCalendar('.test-calendar');
const calendar2 = makeCalendar('.second-calendar', 2020, 8);

console.log( 'calendar', calendar );
console.log( 'calendar2', calendar2 );
