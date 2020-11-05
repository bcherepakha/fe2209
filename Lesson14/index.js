const arr = [1, 3, 4, 5, 6, 7, 5, 2, 22];

function findMax(arr) {
    let max = arr[0];

    arr.forEach(el => {
        if (el > max) {
            max = el;
        }
    });

    return max;
}

function findMax2(arr) {
    // return Math.max.apply(Math, arr); // arguments, this = Math
    return Math.max(...arr);
}

// f(); // this = global | undefined
// arr.f(); // this = arr;
// a.b.c.f(); // this = a.b.c;
// f.call(a, 1, 3, 4, 5, 6, 7, 5, 2, 22); // this -> a
// f.apply(b, [1, 3, 4, 5, 6, 7, 5, 2, 22]); // this -> b
