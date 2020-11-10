const startAnimationBtn = document.querySelector('.start-animation');
const squareEl = document.querySelector('.square');
const circleEl = document.querySelector('.circle');

startAnimationBtn.addEventListener('click', startAnimation);

function startAnimation() {
    // setTimeout(() => {
    //     squareEl.classList.add('square--rotated');
    // }, 500);

    startSquareScaled()
        .then(
            // function (value) {
            //     setTimeout(() => {
            //         startSquareRotated()
            //         .then((value) => {
            //             startCircleShown();
            //         });
            //     }, 0);
            // },
            startSquareRotated
        )
        .then(startCircleShown)
        .catch(function(error) {
            console.log(error);
        });
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

function startSquareScaled() {
    return new Promise(function(resolve, reject) {
        let counter = 0;

        squareEl.addEventListener(
            'transitionend',
            function() {
                if (counter === 1) {
                    resolve('transition startSquareScaled finish');
                } else {
                    counter++;
                }
            }
        );

        delay(1000)
            .then(() => reject('transition startSquareScaled rejected'));

        squareEl.classList.add('square--scaled');
    });
}

function startSquareRotated() {
    return new Promise(function(resolve, reject) {
        squareEl.addEventListener(
            'transitionend',
            function() {
                resolve('transition startSquareRotated finish');
            },
            {
                once: true
            }
        );

        delay(1000)
            .then(() => reject('transition startSquareRotated rejected'));

        squareEl.classList.add('square--rotated');
    });
}

function startCircleShown() {
    return new Promise(function(resolve, reject) {
        circleEl.addEventListener(
            'transitionend',
            function() {
                resolve('transition startCircleShown finish');
            },
            {
                once: true
            }
        );

        delay(1000)
            .then(() => reject('transition startCircleShown rejected'));

        circleEl.classList.add('circle--shown');
    });
}
