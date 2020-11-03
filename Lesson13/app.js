// import * as module2 from './module2.js';
// import { Hi as Hi2, By, default as sum } from './module2.js';
import qwerty, {Hi as Hi2, By} from './module2.js';

console.log( 'this', this ); // ?

const name = 'app';

console.log( window.module1);
console.log( name );

window.module1.Hi();

// console.log('module2', module2);

// module2.Hi();

Hi2();
By();
console.log( qwerty(1, 2) );
