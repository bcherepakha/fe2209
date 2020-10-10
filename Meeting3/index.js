// prompt
// confirm
// alert, console.log
// let, const

const NAME_LENGTH = 3;

getData();

function getData(defaultName, defaultAge) {
    const name = getName(defaultName);
    const age = getAge(defaultAge);
    const isDataCorrect = confirm(`Вас зовут ${name} и Вам ${getAgeByString(age)}. Верно?`);

    if (isDataCorrect) {
        console.log('Рады знакомству!');
    } else {
        console.log('Введите данные заново!');
        getData(name, age);
    }
}

function getName(defaultName = "Anonim") {
    const name = prompt("Введите имя", defaultName);

    if (name === null) {
        console.log('Вы отказались вводить имя...');

        return getName();
    } else if (name.length < NAME_LENGTH || !isNaN(parseInt(name))) {
    // && (*, AND)
    // true  && true    =>  true
    // true  && false   =>  false
    // false && true    =>  false
    // false && false   =>  false
    // Первый встреченный false
    // Последний встреченный true

    // || (+, OR)
    // true  || true    =>  true
    // true  || false   =>  true
    // false || true    =>  true
    // false || false   =>  false
    // Первый встреченный true
    // Последний false

    // if name.length >= 6
    // name.length < 6 === false
    // false || !isNaN(parseInt(name))
    // if name.length < 6
        console.log('Имя не корректно...');

        return getName();
    } else {
        console.log(`Привет, ${name}!`);

        return name;
    }
}

function getAge(defaultAge = '', minAge = 1, maxAge = 200) {
    const age = +prompt('Введите возраст', defaultAge);

    if (isNaN(age) || age <= minAge || age >= maxAge) {
        console.log('Введите корректный возраст...');

        return getAge(minAge, maxAge);
    }

    return age;
}

function getAgeByString(age) {
    const ageStr = age.toString();
    const lastNumber = +ageStr[ageStr.length - 1];
    const lastTwoDigits = age % 100;

    // 1 % 100 => 1
    // 34 % 100 => 34
    // 112 % 100 => 1 + 12 / 100

    // age = 12
    // lastNumber = 2
    // lastTwoDigits = 12
    if (lastNumber === 1 && lastTwoDigits !== 11) {
        return age + ` год`;
    }

    if ((lastNumber > 1 && lastNumber < 5) && (lastTwoDigits <= 11 || lastTwoDigits >= 15)) {
        return `${age} года`;
    }

    return `${age} лет`;
}
