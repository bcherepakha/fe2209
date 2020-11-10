export default class Task {
    static parse(taskAsString) {
        return JSON.parse(taskAsString);
    }

    isCompleted() {
        return this._task.completed;
    }

    constructor(task, props) {
        // this = {}
        // this.__proto__ = Task.prototype

        this._task = task;
        this._props = props;
        this._editing = false;

        this.dbClickistener = this._clickByTitleEl().bind(this);

        this.createTaskElement();

        // return this;
    }

    toString() {
        return JSON.stringify(this._task);
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

        toggleEl.addEventListener(
            'change',
            this._completeTaskListener.bind(this)
        );

        titleEl.addEventListener(
            'click',
            this.dbClickistener
        );

        editEl.addEventListener(
            'submit',
            this.submitEditing.bind(this)
        );

        destroyBtn.addEventListener(
            'click',
            this.destroy.bind(this)
        );

        this._fill();
    }

    _clickByTitleEl() {
        let eventTimeStamp = null;
        let timeoutId = null;

        return function (e) {
            if (!eventTimeStamp || e.timeStamp - eventTimeStamp > 300 ) {
                eventTimeStamp = e.timeStamp;
                // eventTimeStamp = Date.now();

                timeoutId = setTimeout(
                    () => {
                        eventTimeStamp = null;
                    },
                    300
                );
            } else {
                eventTimeStamp = null;
                clearTimeout(timeoutId);
                timeoutId = null;

                this.activateEdit();
            }

        }
    }

    deactivateEdit() {
        this._editing = false;

        this._fill();
    }

    activateEdit() {
        this._editing = true;

        this._fill();
    }

    destroy() {
        this._taskEl.remove();

        if (this._props.deleteHandler) {
            this._props.deleteHandler(this);
        }
    }

    submitEditing(e) {
        e.preventDefault();
        console.log( this._changeTextEl.value );

        if (!this._changeTextEl.value.trim()) {
            return ;
        }

        const newTask = {
            ...this._task,
            text: this._changeTextEl.value
        }

        this._task = newTask;

        this.deactivateEdit();

        if (this._props.changeHandler) {
            this._props.changeHandler(this);
        }
    }

    _completeTaskListener() {
        const newTask = {
            ...this._task,
            completed: this._toggleEl.checked
        }

        this._task = newTask;

        this._fill();

        if (this._props.changeHandler) {
            this._props.changeHandler(this);
        }
    }

    _fill() {
        this._toggleEl.checked = this._task.completed;
        this._titleEl.innerText = this._task.text;
        this._changeTextEl.value = this._task.text;

        if (this._editing) {
            this._taskEl.classList.add('editing');
        } else {
            this._taskEl.classList.remove('editing');
        }
    }

    render() {
        return this._taskEl;
    }
}

export { Task };
