import { EVENTS_TYPE, getState, dispatch } from './appState.js';

export class BeerOptions {
    constructor() {
        this._formEl = document.querySelector('.beer-options');
        this._abvGtEl = this._formEl.querySelector('[name=abv_gt]');
        this._abvLtEl = this._formEl.querySelector('[name=abv_lt]');
        this._ibuGtEl = this._formEl.querySelector('[name=ibu_gt]');
        this._ibuLtEl = this._formEl.querySelector('[name=ibu_lt]');
        this._ebcGtEl = this._formEl.querySelector('[name=ebc_gt]');
        this._ebcLtEl = this._formEl.querySelector('[name=ebc_lt]');
        this._yeastTemplate = this._formEl.querySelector('#yeastrow');
        this._yeastEl = this._formEl.querySelector('.beer-options__list--yeast');

        this._formEl.addEventListener('input', this.onChange.bind(this));

        this._fillYest();
    }

    _fillYest() {
        const { yeast } = getState();
        const yeastCollection = yeast.map( yestName => {
            const nodeEl = document.importNode(this._yeastTemplate.content, true);
            const rootEl = nodeEl.children[0];
            const inputEl = rootEl.querySelector('.beer-options__list-checkbox');
            const textEl = rootEl.querySelector('span');

            textEl.innerText = yestName;
            inputEl.value = yestName;

            return rootEl;
        });

        this._yeastEl.append(...yeastCollection);
    }

    onChange() {
        const inputs = this._formEl.querySelectorAll('[name]');
        const beerOptions = {};

        inputs.forEach(input => {
            if (input.type === 'text' && input.value) {
                beerOptions[input.name] = input.value;
            } else if (input.type === 'checkbox' && input.checked) {
                if (!beerOptions[input.name]) {
                    beerOptions[input.name] = [];
                }

                beerOptions[input.name].push(input.value);
            }
        })

        dispatch({
            type: EVENTS_TYPE.CHANGE_BEER_OPTIONS,
            beerOptions
        });
    }
}
