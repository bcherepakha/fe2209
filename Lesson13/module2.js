const name = 'module 2';

export function Hi() {
    console.log(`Hi. This is ${name}.`);
}

function By() {
    console.log('By.');
}

export { By };

export default function sum(a, b) {
    return a + b;
}
