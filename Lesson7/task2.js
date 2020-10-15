// В ваш подъезд вьехали новые жильцы, которые привезли с собой тараканов.
// Насекомые в поисках еды ползут по вентиляционной шахте.
// За час они поднимаются на 1м, но сразу после этого теряют равновесие и скатываются вниз на 0.5м
// Вопрос: сколько времени у вас есть на покупку ловушек для тараканов, если расстояние от вас до соседей 5м.

// (*) Напишите функцию, которая будет решать эту задачу в общем виде, для любых (speed, slowdown, mine),
// где mine - это высота шахты, speed - скорость таракана за час, slowdown - расстояние падения из-за усталости

// 1. Таракан ползет 1 час
// 2. Если таракан дополз до края шахты, то он не скатывается и мы возвращаем время
// 3. Иначе Таракан скатывается.
// 4. Повторяем пункт 1-3

function getTimeForInterceptCockroaches(mine, speed, slowdown) {
    let position = 0;
    let time = 0;

    if (mine < 0) {
        return { error: 'Unexpected mine'; }
    }

    if (mine === 0) {
        return 0;
    }

    if (mine < speed) {
        return mine / speed;
    }

    do {
        time++;
        // position = position + speed;
        position += speed;

        if (position < mine) {
            position -= slowdown;
        }
    } while (position <= mine);

    if (position > mine) {
        time -= (position - mine) / speed;
    }

    return time;
}

getTimeForInterceptCockroaches(.9, 1, .5); // .9
getTimeForInterceptCockroaches(2, 1, .5);  // 3
getTimeForInterceptCockroaches(4, 1, .5);  // 7
getTimeForInterceptCockroaches(5, 1, .5);
