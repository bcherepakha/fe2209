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

// month: 1 - 12
function getLastDayNumberOfMonthInYear(year, month) {
    const currentDate = new Date(year, month, 0);

    return currentDate.getDate();
}

function getCalendarDaysListElement() {
    return document.querySelector('.calendar-days');
}

function clearCalendarDysList() {
    const listElement = getCalendarDaysListElement();

    console.log(listElement.innerHTML);
    console.log(listElement.innerText);

    // listElement.innerHTML = `
    // <li class="calendar-day calendar-day--not-in-month">28</li>
    // <li class="calendar-day calendar-day--not-in-month">29</li>
    // <li class="calendar-day calendar-day--not-in-month">30</li>
    // `;

    listElement.innerText = '';
}

clearCalendarDysList();

function createDayElement(elementDate, curentMonthNumber) {
    const rootElement = document.createElement('li');

    rootElement.innerText = elementDate.getDate();
    rootElement.className = 'calendar-day';
    rootElement.setAttribute('class', 'calendar-day');

    if (elementDate.getMonth() !== curentMonthNumber) {
        // rootElement.className += ' calendar-day--not-in-month';
        rootElement.classList.add('calendar-day--not-in-month');
    }

    return rootElement;
}

console.log( createDayElement(new Date(), 10) );
