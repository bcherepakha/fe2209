const game = {
    boardEl: document.querySelector('.board'),
    board: suffleArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 ])
    // boardItems: {1: new Tile()}
}

// idx = 0 ... 15
function getPositionByIndex(idx) {
    const rowIdx = Math.floor(idx / 4);
    const columnIdx = idx % 4;

    return {
        top: `${rowIdx * 25}%`,
        left: `${columnIdx * 25}%`,
    };
}

function suffleArr(arr) {
    return arr.sort(function (el1, el2) {
        return Math.random() - 0.5;
    });
}

function step(num) {
    const numIdx = game.board.findIndex(function(el) {
        return el === num;
    });
    const emptyIdx = game.board.findIndex(function(el) {
        return el === 0;
    });
    const siblingsIdx = {
        top: Math.floor(numIdx / 4) === 0 ? null : numIdx - 4,
        bottom: numIdx + 4, // ?
        right: numIdx % 4 === 3 ? null :numIdx + 1,
        left: numIdx % 4 === 0 ? null : numIdx - 1,
    };

    console.log({ numIdx, emptyIdx });

    if (Object.values(siblingsIdx).includes(emptyIdx)) {
        // i can do step
        game.board[emptyIdx] = num;
        game.board[numIdx] = 0;
    }

    console.warn('can\'t do step');
}

function isWin() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 ].join() === game.board.join();
}

console.log( suffleArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) );
console.log( game );

step(5);
console.log( isWin() );
