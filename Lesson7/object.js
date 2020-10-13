/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Alexander.
    3.  Добавьте свойство group со значением fe2209.
    4.  Измените значение свойства name на Ilya.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Ivan.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

// const user = new Object();
const user = {
    group: 'unknown',
    name: 'Vira',
    '11': 11,
    10: 10,
    'balance in USD': 10
};

// user['name'] = 'Alexander';
user.name = 'Alexander';

console.log( user ); // #12

// user['group'] = 'fe2209';
user.group = 'fe2209';

console.log( user ); // #12

user['name'] = 'Ilya';
// user.name = 'Ilya';

console.log( user ); // #12

delete user.name;
delete user['name'];

console.log( user );
console.log( user.age );
console.log( user.name );

function logObject(obj) {
    for (const key in obj) {
        console.log(key, obj[key]); // obj.key === obj['key']
    }
}

// logObject(user);

function copyObj(obj) {
    const result = {};

    for (const key in obj) {
        result[key] = obj[key];
    }

    return result;
}

const user2 = user; // #12

user2.name = 'Alexander';

console.log(user2);
console.log(user);

const user3 = copyObj(user);

console.log(user3);
user3.name = 'Ilya'; // #13

console.log(user3);
console.log(user2);
console.log(user);

function diff(obj1, obj2) {

}

diff(user, user2); // { result: true}
diff(user, copyObj(user)); // { result: true}
diff(user, user3); // { result: false, differs: 'name, age' }

// const arr = new Array();
const arr = ['Alexander', 10, 'hello', true];

console.log(arr);
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);

arr[0] = 'Ilya'; // arr[0], arr['0']
console.log(arr);
console.log(arr.length);

arr[10] = 'ten';
console.log(arr.length);
console.log(arr);

function getLastElement(arr) {
    return arr[arr.length - 1];
}

arr[arr.length] = 8;
console.log(arr);

arr.push(9);
console.log(arr);

// delete arr[arr.length - 1];
// console.log(arr);

console.log( arr.pop() ); // 9
console.log(arr);

console.log( arr.shift() ); // 'Ilya'
console.log(arr);

arr.unshift('Alexander');
console.log(arr);

function unshift(elem, arr) {
    // for (const key in arr) {
    //     console.log(key, arr[key]);
    // }
    for (let i=0; i < arr.length; i++) {
        console.log(i, arr[i]);
    }
}

unshift('hello', arr);
