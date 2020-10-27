'use strict';

function sum(a, b = 8) {
    // let a = arguments[0];
    // let b = arguments[1] || 8;
    console.log('context', this);
    console.log('arguments', arguments);

    console.log('b', b);
    return a + b;
}

console.log('1 + 2', sum(1, 2) ); // 3
console.log('1', sum(1) );
console.log('1, 2, 3, 4', sum(1, 2, 3, 4) );

const calculator = {
    sum: sum
};

console.log('2 + 6', calculator.sum(2, 6) );

sum.call({a: 1}, 1, 2);
sum.call(null, 1);
sum.call('hello!', 1, 2, 3, 4);

calculator.sum.apply({ a: 1}, [1, 2]);
calculator.sum.apply(null, [1]);
calculator.sum.apply('hello!', [1, 2, 3, 4]);

const a = new sum;
const b = new sum(1, 2);

console.log(a, b);

const c = calculator.sum;

c(); // this = undefined | Window | global


function bind(f, context, ...args) {
    return function (...newArguments) {
        return f.apply(context, args.concat(newArguments));
    }
}
