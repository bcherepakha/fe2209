/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Maksym: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Maxim: getRandomBall(15, 80)
};

function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
*/

function getLeader(grade) {
    let maxValue = -Infinity;
    let leaderName = '';

    for (const name in grade) {
        if (grade[name] > maxValue) {
            leaderName = name;
            maxValue = grade[name];
        }
    }

    return { name: leaderName, value: maxValue };
}

console.log( getLeader(grade).name );

function getAverageValue(grade) {
    let sum = 0;
    let length = 0;

    for (const name in grade) {
        sum += grade[name];
        length++;
    }

    return sum / length;
}

console.log( getAverageValue(grade) );

// console.log( Object.values(grade) );
// console.log( Object.keys(grade) );
// console.log( Object.entries(grade) );

function getAverageUser(grade) {
    const averageValue = getAverageValue(grade);
    let minDiff = Infinity;
    let averageUserName = '';

    for (const name in grade) {
        const currentDiff = Math.abs(grade[name] - averageValue);

        if (currentDiff < minDiff) {
            minDiff = currentDiff;
            averageUserName = name;
        }
    }

    return averageUserName;
}

function getLastUser(grade) {
    const averageValue = getAverageValue(grade);
    const result = [];
    const userNames = Object.keys(grade);

    for (let i=0; i < userNames.length; i++) {
        if (grade[userNames[i]] < averageValue) {
            result.push(userNames[i]);
        }
    }

    return result;
}

console.log( getAverageUser(grade) );
console.log( getLastUser(grade) );

function getLeaders(grade) {
    const result = [];
    // const gradeCopy = copyObj(grade);
    const gradeCopy = { ...grade };

    for (let place = 0; place < 3; place++) {
        const leaderName = getLeader(gradeCopy).name;
        result.push(leaderName);

        console.log(JSON.stringify(gradeCopy));

        delete gradeCopy[leaderName];
    }

    return result;
}

console.log( getLeaders(grade) );
