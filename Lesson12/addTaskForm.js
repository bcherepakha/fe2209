export function AddTaskForm(props) {
    // this = {};
    // this.__proto__ = AddTaskForm.prototype;

    this._props = props;

    if (!props.selector) {
        throw new Error('AddTaskForm: selector is required props');
    }

    this._formEl = document.querySelector(props.selector);

    if (!this._formEl) {
        throw new Error(`AddTaskForm: can't find the element by selector ${props.selector}`);
    }

    this._completeEl = this._formEl.querySelector('.complete-all');
    this._textEl = this._formEl.querySelector('.new-todo');

    this._formEl.addEventListener('submit', this.addTask.bind(this));

    // return this;
}

AddTaskForm.prototype.addTask = function (e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        text: this._textEl.value,
        completed: this._completeEl.checked
    }



    if (this._props.addTaskHandler) {
        this._props.addTaskHandler(task)
            .then(({ status }) => {
                if (status === 'OK') {
                    this._textEl.value = '';
                }
            });
    } else {
        this._textEl.value = '';
    }
}
