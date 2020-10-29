class Task {
    constructor(task, props) {
        // this = {}
        // this.__proto__ = Task.prototype

        this._task = task;
        this._props = props;

        this.createTaskElement();

        // return this;
    }

    createTaskElement() {
        const rootEl = document.createElement(this._props.element || 'div');
        const viewEl = document.createElement('div');
        const editEl = document.createElement('form');
        const toggleEl = document.createElement('input');
        const titleEl = document.createElement('span');
        const destroyBtn = document.createElement('button');
        const changeTextEl = document.createElement('input');
        const submitBtn = document.createElement('button');

        rootEl.append(viewEl, editEl);
        viewEl.append(toggleEl, titleEl, destroyBtn);

        viewEl.classList.add('view');
        toggleEl.classList.add('toggle');
        toggleEl.type = 'checkbox';
        destroyBtn.classList.add('destroy');

        changeTextEl.classList.add('edit');
        submitBtn.classList.add('visually-hidden');
        submitBtn.type = 'submit';
        submitBtn.innerText = 'Изменить';

        editEl.append(changeTextEl, submitBtn);

        this._changeTextEl = changeTextEl;
        this._titleEl = titleEl;
        this._toggleEl = toggleEl;
        this._taskEl = rootEl;

        this._fill();
    }

    _fill() {
        this._toggleEl.checked = this._task.completed;
        this._titleEl.innerText = this._task.text;
        this._changeTextEl = this._task.text;
    }

    render() {
        return this._taskEl;
    }
}

console.dir(Task);
