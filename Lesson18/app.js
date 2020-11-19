import { Router } from './router.js';
import { BeerOptions } from './beerOptions.js';
import { getState } from './appState.js';
import { BeerList } from './beerList.js';

const router = new Router({
    catalog: renderCatalog,
    favourites: renderFavourite
});

const beerOptions = new BeerOptions();

renderInitPage();

function renderInitPage() {
    const currentPageFunc = router.getCurrentPageFunc();

    if (currentPageFunc) {
        currentPageFunc();
    } else {
        location.hash = getState().currentPage;
    }
}

function renderCatalog() {
    const beerList = new BeerList();

    console.log({ beerList });
}

function renderFavourite() {
    console.log('renderFavourite');
}
