import Task from './task.js';
import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';

const app = {
    state: {
        tasks: []
    },
    storageKey: 'todoListTasks',
    addTaskForm: new AddTaskForm({
        selector: '.header',
        addTaskHandler: addTask
    }),
    list: new List({
        selector: '.todo-list'
    }),

    saveTaskToLocalStorage() {
        saveTaskToLocalStorage(
            this.storageKey,
            JSON.stringify(
                this.state.tasks
                    .map((taskObj) => {
                        return taskObj.toString();
                    })
            )
        );
    },

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }

        this.saveTaskToLocalStorage();
        app.list.changeProps({ items: this.state.tasks });
    },
    init() {
        if (!localStorage[this.storageKey]) {
            return ;
        }

        try {

            const tasks = JSON.parse(localStorage[this.storageKey])
                .map((taskAsString) => {
                    try {
                        return Task.parse(taskAsString);
                    } catch (ex) {
                        return null;
                    }
                })
                .filter(taskOrNull => !!taskOrNull)
                .map(task => {
                    return createTask(task);
                });

            app.setState({ tasks });

        } catch (ex) {
            return ;
        }
    }
}

app.init();

/** task
 * {
 *      id: number;
 *      text: string;
 *      complited: boolean;
 *  }
 */

function createTask(task) {
    return new Task(task, {
        element: 'li',
        changeHandler: changeTaskHandler
    });
}

function addTask(task) {
    const taskObj = createTask(task);
    const { tasks } = app.state; // tasks = app.state.tasks

    tasks.push(taskObj);

    app.setState({ tasks });
}

function saveTaskToLocalStorage(key, value) {
    localStorage[key] = value;
}

function changeTaskHandler() {
    app.saveTaskToLocalStorage();
}
