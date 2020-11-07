import { Modal } from '../Modal/modal.js';

// this.__proto__ === Confirm.prototype
// this.__proto__.__proto__ === Confirm.prototype.__proto__ === Modal.prototype
export class Confirm extends Modal {
    // constructor(props) {
    //     super(props); // Modal.constructor

    //     console.log('Constructor');
    // }

    init() {
        super.init();

        if (this.props.actions) {
            this.actionsBtn = this.props.actions.map(this.createAction, this);

            this.actionsEl.innerText = '';
            this.actionsEl.append(...this.actionsBtn);
        }
    }

    createAction(actionData) {
        const { title, action } = actionData;
        const btn = document.createElement('button');

        btn.innerText = title;
        btn.addEventListener('click', action.bind(this, actionData));

        return btn;
    }
}

// const confirmWindow = new Confirm({
//     title: 'Confirm',
//     actions: [
//         {
//             title: 'Ok',
//             action: function (actionData, e) {
//                 console.log(this);
//                 console.log(actionData);
//                 console.log(e);
//                 console.log(actionData.title);
//             }
//         },
//         {
//             title: 'Cancel',
//             action: function (actionData) {
//                 console.log(actionData.title);
//             }
//         }
//     ]
// });

// console.log( confirmWindow );

// confirmWindow.show();
