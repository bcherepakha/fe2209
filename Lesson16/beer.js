// https://punkapi.com/documentation/v2

const beersList = document.querySelector('.beers');

initForm();

function initForm() {
    const formEl = document.querySelector('.get-beer');
    const beerName = formEl.elements['beer_name'];
    const pageEl = formEl.elements['page'];
    const perPageEl = formEl.elements['per_page'];

    formEl.addEventListener(
        'submit',
        e => {
            e.preventDefault();
            const beerNameValue = beerName.value;

            getBeer({
                beer_name: beerNameValue,
                page: pageEl.value,
                'per_page': perPageEl.value
            })
                .then(data => {
                    beersList.innerText = '';
                    beersList.append(...data.map(renderBeer));
                })
                .catch(error => console.log(error));
        }
    )
}

function getBeer(params) {
    const paramsStr = Object.entries(params)
        .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
        .join('&');
    const url = `https://api.punkapi.com/v2/beers?${paramsStr}`;

    return fetch(url)
        .then(response => response.json());
}

function renderBeer(beerData) {
    const {name, image_url, description} = beerData;
    const beerRootEl = document.createElement('li');
    const beerNameEl = document.createElement('div');
    const beerImgEl = document.createElement('img');
    const beerDescriptionEl = document.createElement('div');

    beerRootEl.classList.add('beer');

    beerNameEl.classList.add('beer__title');
    beerNameEl.innerText = name;

    beerImgEl.classList.add('beer__image');
    beerImgEl.src = image_url;

    beerDescriptionEl.classList.add('beer__description');
    beerDescriptionEl.innerText = description;

    beerRootEl.append(beerNameEl, beerImgEl, beerDescriptionEl);

    return beerRootEl;
}

// state, props -> render
// AppState
// C -> data to AppState
// C -> subscribe to AppState change -> render
