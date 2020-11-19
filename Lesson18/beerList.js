import { getState, subscribe } from './appState.js';

const TIME2THINK = 500;
let fetchTimoutId = null;

export class BeerList {
    constructor() {
        this._beerCardTemplate = document.querySelector('#beercard');
        this._host = 'https://api.punkapi.com/v2/beers';
        this._updateBeerList = this.updateBeerList.bind(this);
        this._beerListEl = document.querySelector('.beer-list');
        this._counterEl = document.querySelector('.beer-counter span');

        subscribe('beerOptionChange', this._updateBeerList);
    }

    updateBeerList() {
        if (fetchTimoutId) {
            clearTimeout(fetchTimoutId);
        }

        fetchTimoutId = setTimeout(() => {
            clearTimeout(fetchTimoutId);
            fetchTimoutId = null;

            this.fetchBeer()
                .then(beers => this.renderCards(beers));

        }, TIME2THINK);

    }

    fetchBeer() {
        const { beerOptions } = getState();
        const params = Object.keys(beerOptions)
            .filter(key => typeof beerOptions[key] === 'string')
            .map(key => `${key}=${beerOptions[key]}`)
            .join('&');

        return fetch(`${this._host}?${params}`)
            .then(response => response.json());
    }

    renderCards(beers) {
        this._beerListEl.innerText = '';
        this._beerListEl.append( ...beers.map(this.renderBeerCard, this) );
        this._counterEl.innerText = beers.length;
    }

    renderBeerCard(beer) {
        const nodeEl = document.importNode(this._beerCardTemplate.content, true);
        const rootEl = nodeEl.children[0];
        const imageEl = rootEl.querySelector('.beer-list__image');
        const titleEl = rootEl.querySelector('.beer-list__title');
        const descriptionEl = rootEl.querySelector('.beer-list__description');
        const { image_url, name, description } = beer;

        imageEl.src = image_url;
        titleEl.innerText = name;
        descriptionEl.innerText = description;

        return rootEl;
    }
}
