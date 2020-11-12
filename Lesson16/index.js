let beer = fetch(
    'https://api.punkapi.com/v2/beers',
    {
        method: 'GET'
    });

// let google = fetch('http://google.com');

console.log(beer);
// console.log(google);

beer
    .then((response) => {
        console.log('sucees', response);

        // response.formData()
        // response.blob()
        // response.arayBuffer()

        return response.json();
    })
    // response.text
    // .then((text) => {
    //     console.log(text); // JSON
    //     console.log( JSON.parse(text) );
    // })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => { console.log('error', error); });

// google
//     .then((response) => { console.log('sucees', response); })
//     .catch((error) => { console.log('error', error); });
