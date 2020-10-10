// >, <, >=, <=, ==, ===, !=, !==

let yes = 1 < 2; // true
let no = 2 < 1; // false

let sYes = 'A' < 'b'; // 65 < 98 === true
let sNo = 'Hello, world' < 'Hello, name'; // 119 < 110 === false

let a = 'qwerty';
let b = 'asdfgh';

console.log(a === b);
console.log(a !== b);
console.log(a !== a);
console.log(typeof a === typeof b); // typeof null === 'object'

console.log( '2' > 1 ); // true
console.log( '01a' > 1); // false

let z = 0;
let sz = '0';

console.log( Boolean(z) > Boolean(sz) ); // false > true => 0 > 1 => false

console.log( 0 == false ); // true
console.log( '' == false); // true

console.log( null === undefined ); // false
console.log( null == undefined ); // true
console.log( null >= undefined); // false 0 >= NaN

console.log( null > 0);  // false
console.log( null == 0); // false
console.log( null >= 0); // true

console.log( undefined < 0 ); // false
console.log( undefined == 0 ); // false
console.log( undefined <= 0 ); // false

let year = prompt('Введите ваш год рождения'); // 2000

if (+year <= 2002) {
    console.log('Вы совершеннолетние');
} else {
    console.log('Вам меньше 18');
}
