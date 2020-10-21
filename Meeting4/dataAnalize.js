/** Дана информация о людях ANCESTRY_DATA
 *
 * Используя этот набор данных, подсчитайте:
 *
 * среднюю разницу в возрасте между матерями и их детьми.
 * среднюю разницу между в возрасте между родителями
 * среднее количество детей в семье
 * средний возраст людей для каждого из столетий. Назначаем столетию людей, беря их год смерти, деля его на 100 и округляя: `Math.ceil(person.died / 100)`.
*/

console.log( 'ANCESTRY_DATA', ANCESTRY_DATA );

function getChildren(human, ANCESTRY_DATA) {
    return ANCESTRY_DATA.filter(function (child) {
        return child.father === human.name || child.mother === human.name;
    })
}

function getAgeDiff(human1, human2) {
    // return Math.abs(human2.born - human1.born);
    return human2.born - human1.born;
}

// console.log(
//     getAgeDiff(
//         { "born": 1832 },
//         { "born": 1876 }
//     )
// );

function isFemail(human) {
    return human.sex === 'f';
}

function arrSum(arr) {
    return arr.reduce(
        function (sum, el) {
            return sum + el;
        },
        0
    );
}

 function getArrAverage(arr) {
    return arrSum(arr) / arr.length;
}

function getAllAgeDiffsBetweenMotherAndChildren(ANCESTRY_DATA) {
    const mothers = ANCESTRY_DATA.filter(isFemail);
    const mothersChildrenDiffs = mothers.map(function(mother) {
        return getChildren(mother, ANCESTRY_DATA)
            .map(function (child) {
                return getAgeDiff(mother, child);
            })
    });
    const ageDiffs = mothersChildrenDiffs.reduce(
        function (result, diffs) {
            return result.concat(diffs);
        },
        []
    );

    // console.log('mothersChildrenDiffs', mothersChildrenDiffs);
    // console.log('ageDiffs', ageDiffs);

    return ageDiffs;
}

console.log(
    'средняя разница в возрасте между матерями и их детьми: ',
    getArrAverage( getAllAgeDiffsBetweenMotherAndChildren(ANCESTRY_DATA) )
);

// function transformHuman(human, humanIdx, data) {
//     const children = getChildren(human, data);
//     const ageDiffs = children.map(function (child) {
//         return getAgeDiff(human, child);
//     });

//     return {
//         human: human,
//         children: children,
//         ageDiffs: ageDiffs
//     };
// }

// console.log( ANCESTRY_DATA.map(transformHuman) );

function getHumanByName(name, ANCESTRY_DATA) {
    return ANCESTRY_DATA.find(function (human) {
        return human.name === name;
    });
}

function createFamilyIndex(humanName, motherName = '', fatherName = '') {
    return [humanName, motherName, fatherName].join(';');
}

function createMotherFatherIndex(motherName = '', fatherName = '') {
    return [motherName, fatherName].join(';');
}

function getFamily(human, ANCESTRY_DATA) {
    const mother = getHumanByName(human.mother, ANCESTRY_DATA);
    const father = getHumanByName(human.father, ANCESTRY_DATA) || '';
    const children = getChildren(human, ANCESTRY_DATA);
    const familyIndex = createFamilyIndex(
        human.name,
        mother ? mother.name : '',
        father && father.name
    );

    return {
        human,
        mother: mother,
        father,
        children,
        familyIndex,
        motherFatherIndex: createMotherFatherIndex(mother && mother.name, father && father.name)
    };
}

function getUniqItemByIndex(arr, getIndex) {
    return Object.values(
        arr.reduce(
            function (indexedData, el) {
                indexedData[getIndex(el)] = el;

                return indexedData;
            },
            {}
        )
    );
}

console.log(
    'среднюю разницу между в возрасте между родителями',
    getArrAverage(
        getUniqItemByIndex(
            ANCESTRY_DATA
                .map(function (human) { return getFamily(human, ANCESTRY_DATA); })
                .filter(function (family) {
                    return family.mother && family.father;
                }),
            function (family) { return family.motherFatherIndex; }
        ).map(function (family) {
            return Math.abs(getAgeDiff(family.mother, family.father));
        })
    )
);

function getCentury(person) {
    return Math.ceil(person.died / 100);
}

function getAge(human) {
    return human.died - human.born;
}

const ageByCentury = ANCESTRY_DATA.reduce(
    function (result, human) {
        const humanCentury = getCentury(human);
        const humanAge = getAge(human);

        if (!result[humanCentury]) {
            result[humanCentury] = [];
        }

        result[humanCentury].push(humanAge);

        return result;
    },
    {}
)

for (const century in ageByCentury) {
    ageByCentury[century] = getArrAverage(ageByCentury[century]);
}

console.log(
    'средний возраст людей для каждого из столетий',
    ageByCentury
);
