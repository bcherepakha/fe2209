import { Confirm } from '../Meeting7/Confirm/index.js';

const game = {
    boardEl: document.querySelector('.board'),
    board: suffleArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15 ]),
    getPositionByIndex,
    suffleArr,
    step,
    isWin,
    render,
    init,
    clickByItem,
    afterStep,
    startNewGame,
    timer: new Timer(),
    steps: 0
}

game.init();
game.render();

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
    this.timer.start();

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

    if (Object.values(siblingsIdx).includes(emptyIdx)) {
        // i can do step
        game.board[emptyIdx] = num;
        game.board[numIdx] = 0;
        game.steps++;

        game.render();
    }
}

function isWin() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 ].join() === game.board.join();
}

function init() {
    this.boardItems = this.board
        .reduce((collection, num) => {
            if (num === 0) {
                return collection;
            }

            const el = document.createElement('div');

            el.classList.add('board__item');
            el.innerText = num;
            el.addEventListener('click', this.clickByItem.bind(this, num));

            collection[num] = el;

            return collection;
        },
        {});

    this.boardEl.append( ...Object.values(this.boardItems) );
    this.boardEl.addEventListener('transitionend', this.afterStep.bind(this));
    document.body.append(this.timer.render());
}

function clickByItem(num, e) {
    this.step(num);
}

function render() {
    this.board.forEach((num, idx) => {
        if (num !== 0) {
            const position = this.getPositionByIndex(idx);
            this.boardItems[num].style.top = position.top;
            this.boardItems[num].style.left = position.left;
        }
    });
}

function afterStep() {
    if (this.isWin()) {
        this.timer.pause();
        const confirmBody = document.createElement('ul');
        const confirmSteps = document.createElement('li');
        const confirmTimer = document.createElement('li');

        confirmBody.append(confirmSteps, confirmTimer);
        confirmSteps.innerText = `Steps: ${this.steps}`;
        confirmTimer.innerText = `Time: ${this.timer.getTimeAsString()}`;

        const confirmWindow = new Confirm({
            title: 'You win',
            contentHTML: confirmBody,
            actions: [
                {
                    title: 'Refresh game',
                    action: () => {
                        confirmWindow.hide();
                        this.startNewGame();
                    },
                }
            ]
        });

        confirmWindow.show();
    }
}

function startNewGame() {
    this.board = this.suffleArr(this.board);
    this.timer.refresh();
    this.timer.start();
    this.render();
}
