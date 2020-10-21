const classNames = ['firstClass', 'secondClass', 'thirdClass'];

// task 1
// Написать функцию, которая будет возвращать строку в которой будут все классы элмента через пробел
function getClassName(classNames) {
    return classNames.join(' ');
}

console.log('task1', getClassName(classNames) === 'firstClass secondClass thirdClass'); // true

// task 2
// удаляет класс из строки
function removeClass(className, removedClass) {
    const classNames = className.split(' '); // ['t', 'g', 'm']

    function notRemoved(cn) {
        return cn !== removedClass;
    }

    const filteredClassNames = classNames.filter(notRemoved); // ['t', 'm']

    // return getClassName(filteredClassNames);
    return filteredClassNames.join(' ');
}

console.log('task2', removeClass('t g m', 'g') === 't m');
console.log('task2', removeClass('t k m', 'g') === 't k m');
console.log('task2', removeClass('t g g m', 'g') === 't m');

// task 3
// добавить класс в строку
function addClass(className, addedClass) {
    const classNames = className.split(' ');
    const isClassAlreadyIncludes = classNames.includes(addedClass);
    // const isClassAlreadyIncludes = !classNames.every(function (cn) {
    //     return cn !== addedClass;
    // });
    // const isClassAlreadyIncludes = classNames.some(function (cn) {
    //     return cn === addedClass;
    // });
    // const isClassAlreadyIncludes = classNames.filter(function (cn) {
    //     return cn === addedClass;
    // }).length > 0;

    if (!isClassAlreadyIncludes) {
        return className + ' ' + addedClass;
    }

    return className;
}

console.log('task3', addClass('a b', 'c') === 'a b c' );
console.log('task3', addClass('a b c', 'c') === 'a b c' );

// task 4
// добавить класс, если его нет в строке и удалить, если он там есть
function toggleClass(className, toggledClass) {
    const classNames = className.split(' ');

    if (classNames.includes(toggledClass)) {
        return removeClass(className, toggledClass);
    } else {
        return addClass(className, toggledClass);
    }
}

console.log('task 4', toggleClass('a b c', 'b') === 'a c');
console.log('task 4', toggleClass('a c', 'b') === 'a c b');

// task 5
// функция формирования классов из объекта
// Ключами обьекта, являются имена классов, значениями булевые true/false
// если стоит true, то класс добавляется к строке, если false, то не добавляется
// Object.keys, Object.values, Object.entries, for in
function cn(className, classObj) {
    let result = className;
    const classForAdd = Object.keys(classObj)
        .filter(function (addClass) {
            return classObj[addClass];
        }); // ['c', 'e']

    // for (const addedClass in classObj) {
    for (let i=0; i < classForAdd.length; i++) {
        const addedClass = classForAdd[i];

        // if (classObj[addedClass]) {
            result = addClass(result, addedClass);
        // }
    }

    return result;
}

console.log('task 5', cn('a b', { c: true, d: false, e: true }) === 'a b c e');
console.log('task 5', cn('a b', { c: false, d: false, e: true, b: true }) === 'a b e');

// task 6
// сформировать массив состоящий из elementsCount элементов
// первый и второй элемент этого массива передаются
// каждый следующий элемент получается путем суммы двух предидущих
function fib(firstElement, lastElement, elementsCount = 10) {
    const result = [firstElement, lastElement];

    if (elementsCount <= result.length) {
        result.length = elementsCount;

        return result;
    }

    // for (let i=3; i <= elementsCount; i++) {
        // 3, 4, 5, 6, 7, 8, 9, 10
        // result.push(result[i - 2] + result[i - 3]);
    for (let i=2; i < elementsCount; i++) {
        // 2, 3, 4, 5, 6, 7, 8, 9
        result.push(result[i - 1] + result[i - 2]);
    }

    return result;
}

console.log('task 6', fib(1, 1, 10).join(',') === [1, 1, 2, 3, 5, 8, 13, 21, 34, 55].join(','));
console.log('task 6', fib(2, 4, 4).join(',') === [2, 4, 6, 10].join(','));

// task 7
// Найти произведение элементов массива
function mult(arr) {
    return arr.reduce(
        function (result, el) {
            return result * el;
        },
        1
    );
}

console.log('task 7', mult([1, 2, 3, 1]) === 1*2*3*1 );
console.log('task 7', mult([1, 3, 3, 5]) === 1*3*3*5 );
