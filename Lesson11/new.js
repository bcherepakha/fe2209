function Animal(type, speed) {
    // this = {}
    // this.__proto__ = Animal.prototype;

    this.type = type;
    this.speed = speed;
    this.isRun = false;

    // return this;
}

Animal.prototype.run = function () {
    console.log('run', this);
    this.isRun = true;
};

const rabbit = new Animal('rabbit', 5);
const fox = new Animal('fox', 7);

console.log(rabbit);
console.log(fox);

rabbit.run();
fox.run();


const a = {
    a: 1
}

const b = {
    b: 2
}

b.__proto__ = a;

console.log(a, b);
console.log( b.a );


