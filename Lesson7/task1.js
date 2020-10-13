// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home
// 4. В первых трех задачах добавить пользователю возможность ввести значения переменных.
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

logNumber(10);
logSimpleNumber(10);
// askAndLogNumber();

function logNumber(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

// logNumber(15);

function isSimple(n) {
    for (let m = 2; m < n; m++) {
        if (n % m === 0) {
            return false;
        }
    }

    return true;
}

function logSimpleNumber(n) {
    let i = 1;

    while (i <=n) {
        if (isSimple(i)) {
            console.log(i);
        }

        i++;
    }
}

function askAndLogNumber() {
    const n = +prompt('Enter number', '10');

    if (!isNaN(n)) {
        logNumber(n);
    }
}

logWhileUser();

function logWhileUser() {
    let userAgreed = true;
    let i = 1;

    // while (userAgreed) {
    // for (; userAgreed; ) {
    //     console.log(i);

    //     i++;
    //     userAgreed = confirm('Continue?');
    // }

    do {
        console.log(i);
        i++;
    } while (confirm('Continue?'));
}

// isSimple(10); // false;
// isSimple(3); // true;
