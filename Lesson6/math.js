let q = parseInt(prompt('Enter the number'), 10);
let w = parseInt(prompt('Enter the next number'), 10);
let result;

// Сложение +
// Вычитание -
// Деление /
// Остаток от деления %
// Умножение *
// Возведение в степень **

result = q % w; // 12 % 5 = 2
console.log(`Остаток от деления ${q} на ${w}`, result);

result = q ** w;
console.log(`${q} ** ${w} = ${result}`);

result = q; // 10
// result = result + 2; // 12
result += 2; // 12
result -= 2; // 10
result -= w;
console.log('result', result);
console.log('q', q);
console.log('w', w);

console.log('q++');
result = q++;
console.log('result', result);
console.log('q', q);
console.log('w', w);

console.log('w--');
result = w--;
console.log('result', result);
console.log('w', w);
console.log('q', q);

console.log('++q');
result = ++q;
console.log('result', result);
console.log('q', q);
console.log('w', w);

console.log('--w');
result = --w;
console.log('result', result);
console.log('w', w);
console.log('q', q);
