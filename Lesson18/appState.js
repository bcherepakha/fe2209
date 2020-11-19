export const EVENTS_TYPE = {
    ROUTE_CHANGE: 'ROUTE_CHANGE',
    CHANGE_BEER_OPTIONS: 'CHANGE_BEER_OPTIONS'
};

const events = {};

export let state = {
    currentPage: 'catalog',
    yeast: ['A', 'B', 'C'],
    beerOptions: {}
};

export function getState() {
    return state;
}

export function dispatch(event) {
    switch(event.type) {
        case EVENTS_TYPE.ROUTE_CHANGE:
            state.currentPage = event.currentPage;
            trigger('routeChange');
            break;
        case EVENTS_TYPE.CHANGE_BEER_OPTIONS:
            state.beerOptions = event.beerOptions;
            trigger('beerOptionChange');
            break;
    }
}

export function subscribe(eventName, callback) {
    if (!events[eventName]) {
        events[eventName] = [];
    }

    events[eventName].push(callback);
}

export function unsubscribe(eventName, callback) {
    if (events[eventName]) {
        events[eventName] = events[eventName].filter(fn => fn !== callback);
    }
}

function trigger(eventName) {
    if (events[eventName]) {
        events[eventName].forEach(callback => callback());
    }
}
