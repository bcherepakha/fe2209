import { EVENTS_TYPE, dispatch } from './appState.js';

export class Router {
    constructor(route) {
        this._route = route;

        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    addRoute(hash, renderPageFunc) {
        this._route[hash] = renderPageFunc;
    }

    getPage() {
        return location.hash.slice(1);
    }

    getCurrentPageFunc() {
        return this._route[this.getPage()];
    }

    onHashChange() {
        const newHash = this.getPage();
        const renderPageFunc = this._route[newHash];

        dispatch({
            type: EVENTS_TYPE.ROUTE_CHANGE,
            currentPage: newHash
        });

        if (renderPageFunc) {
            renderPageFunc();
        }
    }
}
