(function (exports, global) {
    console.log({ exports, global });
    const name = 'module 1';

    function Hi() {
        console.log(`Hi. This is ${name}.`);
    }

    global[exports] = {
        Hi: Hi
    };
})('module1', window); // LE = { exports, global, name, Hi }
