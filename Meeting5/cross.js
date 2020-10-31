const EMPTY_CELL = '';
const X_CELL = 'x';
const O_CELL = '0';

const crossGame = {
    gameEnded: false,
    winner: null,
    board: new Array(9).fill(EMPTY_CELL),
    currentUser: X_CELL,
    stepEnabled: true,
    gameTimer: new Timer(),
    timerX: new Timer(),
    timerO: new Timer()
};

const timerXEl = document.querySelector('.cross__timer--x');
const timerOEl = document.querySelector('.cross__timer--o');
const timerGameEl = document.querySelector('.cross__timer--game');

timerGameEl.append( crossGame.gameTimer.render() );
timerXEl.append( crossGame.timerX.render() );
timerOEl.append( crossGame.timerO.render() );

crossGame.boardEl = document.querySelector('.cross__board');
crossGame.cellItems = crossGame.boardEl.querySelectorAll('.cross__board-item');

crossGame.onAnimationEnd = function () {
    if (this.gameEnded) {
        alert(`Winner ${this.winner}`);
    } else {
        this.stepEnabled = true;
    }
}

crossGame.step = function (idxCell, el) {
    crossGame.gameTimer.start();

    if (crossGame.gameEnded) {
        throw new Error('game already ended');
    }

    if (!crossGame.stepEnabled) {
        return false;
    }

    if (crossGame.board[idxCell] === EMPTY_CELL) {
        crossGame.stepEnabled = false;
        crossGame.board[idxCell] = el;
        crossGame.renderItem(
            idxCell,
            el,
            crossGame.onAnimationEnd.bind(crossGame)
        );

        if (crossGame.isWin(el)) {
            crossGame.gameEnded = true;
            crossGame.winner = el;
            // alert('You win');

            return false;
        }

        return true;
    } else {
        // throw new Error('cell is not empty');

        return false;
    }
}

crossGame.renderItem = function (idxCell, el, onAnimationEnd) {
    const renderedItem = el === X_CELL ? crossGame.createItemX(onAnimationEnd) : crossGame.createItem0(onAnimationEnd);

    crossGame.cellItems[idxCell].append(renderedItem);
}

crossGame.createItem0 = function (onAnimationEnd) {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    svgEl.append(ellipseEl);
    svgEl.setAttribute('class', 'o cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 80 80');

    ellipseEl.setAttribute('cx', '40');
    ellipseEl.setAttribute('cy', '40');
    ellipseEl.setAttribute('rx', '20');
    ellipseEl.setAttribute('ry', '30');

    svgEl.addEventListener(
        'animationend',
        onAnimationEnd,
        {
            once: true
        }
    );

    return svgEl;
}

crossGame.createItemX = function (onAnimationEnd) {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const line1El = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2El = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    svgEl.setAttribute('class', 'x cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 80 80');

    line1El.setAttribute('class', 'x__line1');
    line1El.setAttribute('x1', '20');
    line1El.setAttribute('y1', '10');
    line1El.setAttribute('x2', '60');
    line1El.setAttribute('y2', '70');


    line2El.setAttribute('class', 'x__line2');
    line2El.setAttribute('x1', '60');
    line2El.setAttribute('y1', '10');
    line2El.setAttribute('x2', '20');
    line2El.setAttribute('y2', '70');

    svgEl.append(line1El, line2El);

    line2El.addEventListener(
        'animationend',
        onAnimationEnd,
        {
            once: true
        }
    );

    return svgEl;
}

crossGame.isWin = function (expectedEl) {
    const { board } = crossGame; // board = crossGame.board

    for (let i=0; i < 3; i++) {
        const row = [
            board[3*i],
            board[3*i+1],
            board[3*i+2]
        ];

        if (check(row)) {
            return true;
        }

        const column = [
            board[i],
            board[i+3],
            board[i+6]
        ];

        if (check(column)) {
            return true;
        }
    }

    if (check([board[0], board[4], board[8]])) {
        return true;
    }

    if (check([board[2], board[4], board[6]])) {
        return true;
    }

    function check(verifiableItem) {
        return verifiableItem.every(function(el) {
            return el === expectedEl;
        });
    }

    return false;
}

console.log(crossGame);

// crossGame.step(0, X_CELL);
// crossGame.step(1, O_CELL);
// crossGame.step(4, X_CELL);
// crossGame.step(8, O_CELL);
// crossGame.step(3, X_CELL);
// crossGame.step(5, O_CELL);

console.log( crossGame.cellItems );

// for (let i=0; i < crossGame.cellItems.length; i++ ) {}


// crossGame.cellItems.forEatch(function(cellItem, idx) { // this ? global | undefined | context }, context);
Array.prototype.forEach.call(
    crossGame.cellItems,
    function (cellItem, idx) {
        cellItem.addEventListener(
            'click',
            // function () {
            //     return clickByItem(idx);
            // },
            // clickByItem(idx),
            clickByItem.bind(this, idx)
        );
    },
    // crossGame
);

// function clickByItem(idx) {
//     return function () {
//         console.log('clickByItem', idx);
//     }
// }

crossGame.userStep = function (idxCell) {
    const {currentUser, timerX, timerO} = this;
    const userTimer = {
        [X_CELL]: timerX,
        [O_CELL]: timerO
    }

    console.log(userTimer, currentUser);
    if (this.step(idxCell, currentUser)) {
        userTimer[currentUser].pause();
        this.currentUser = [X_CELL, O_CELL].find(function (user) { return user !== currentUser; });
        userTimer[this.currentUser].start();
    }
}

function clickByItem(idx, e) {
    console.log('clickByItem', idx, e);

    // crossGame.step(idx, X_CELL);
    crossGame.userStep(idx);
}

// crossGame.boardEl.addEventListener(
//     'click',
//     clickByBoard,
//     // true
// );

function clickByBoard(e) {
    console.log('clickByBoard', e);
    console.log('target', e.target); // элемент на котором захвачено событие
    console.log('currentTarget', e.currentTarget); // элемент на котором перехвачено событие

    const cellItem = e.target.closest('.cross__board-item');
    const cellIdx = Array.prototype.findIndex.apply(
        crossGame.cellItems,
        [
            function (el) {
                return el === cellItem;
            }
        ]
    );

    console.log(cellIdx);
    console.log( cellItem.getAttribute('data-index') );
    console.log( cellItem.dataset.index );
}
