const EMPTY_CELL = '';
const X_CELL = 'x';
const O_CELL = '0';

const crossGame = {
    gameEnded: false,
    winner: null,
    board: new Array(9).fill(EMPTY_CELL)
};

crossGame.boardEl = document.querySelector('.cross__board');
crossGame.cellItems = crossGame.boardEl.querySelectorAll('.cross__board-item');

crossGame.step = function (idxCell, el) {
    if (crossGame.gameEnded) {
        throw new Error('game already ended');
    }

    if (crossGame.board[idxCell] === EMPTY_CELL) {
        crossGame.board[idxCell] = el;
        crossGame.renderItem(idxCell, el);

        if (crossGame.isWin(el)) {
            crossGame.gameEnded = true;
            crossGame.winner = el;
            alert('You win');
        }
    } else {
        throw new Error('cell is not empty');
    }
}

crossGame.renderItem = function (idxCell, el) {
    const renderedItem = el === X_CELL ? crossGame.createItemX() : crossGame.createItem0();

    crossGame.cellItems[idxCell].append(renderedItem);
}

crossGame.createItem0 = function () {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    svgEl.append(ellipseEl);
    svgEl.setAttribute('class', 'o cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 80 80');

    ellipseEl.setAttribute('cx', '40');
    ellipseEl.setAttribute('cy', '40');
    ellipseEl.setAttribute('rx', '20');
    ellipseEl.setAttribute('ry', '30');

    return svgEl;
}

crossGame.createItemX = function () {
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

crossGame.step(0, X_CELL);
crossGame.step(1, O_CELL);
crossGame.step(4, X_CELL);
crossGame.step(8, O_CELL);
crossGame.step(3, X_CELL);
crossGame.step(5, O_CELL);
