// LE = { sayHi: function }
let name = 'Ihor'; // LE = { name: 'Ihor', sayHi: function }

sayHi(); // Hi, Ihor; // LE1 = {}

name = 'Andrey';

sayHi(); // Hi, Andrey;

// hoisting
function sayHi() {
    console.log(`Hi, ${name}`);
}

const makeWorker = function (name) {
    return function sayHi() {
        console.log(`Hi, ${name}`);
    }
}

let workerPete = makeWorker('Pete'); // LE3 = { name: 'Pete', sayHi -> workerPete }

// workerPete.[[SCOPE]] = LE3
workerPete(); // Hi, Pete // LE4 = {}

let workerVasya = makeWorker('Vasya');

workerVasya(); // Hi, Vasya
workerPete(); // Hi, Pete
sayHi(); // Hi, Andrey;

function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    return counter;
}

const counter1 = makeCounter(); // LE9 = ( count: 2 )
const counter2 = makeCounter(); // LE10 = ( count: 0 )

console.log( counter1() ); // 0
console.log( counter1() ); // 1
console.log( counter1() );
console.log( counter1() );

console.log( counter2() );
console.log( counter2() );
console.log( counter2() );
console.log( counter2() );

function makeShooters(count) {
    const result = [];

    for (let i=0; i < count; i++) {
        const shooter = function () {
            console.log(i);
        };

        result.push(shooter);
    }

    return result;
}

const shooters = makeShooters(10); // LE-makeShooters = { result: [] }
// LE-makeShooters-0 = { i: 0, shooter -> result[0] }
// LE-makeShooters-1 = { i: 1, shooter -> result[1] }

shooters[0](); // 0
shooters[5](); // 5
shooters[8](); // 8
