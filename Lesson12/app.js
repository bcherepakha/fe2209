import Task from './task.js';
import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';
import TaskCounter from './taskCoounter.js';
import Filter from './filter.js';

const app = {
    state: {
        tasks: [],
        currentFilter: ''
    },
    storageKey: 'todoListTasks',
    addTaskForm: new AddTaskForm({
        selector: '.header',
        addTaskHandler: addTask
    }),
    list: new List({
        selector: '.todo-list'
    }),
    counter: new TaskCounter({
        selector: '.todo-count strong'
    }),
    filter: new Filter({
        selector: '.filters a',
        onChange: changeFilterHandler
    }),

    taskFilters: {
        '#/active': task => !task.isCompleted(),
        '#/completed': task => task.isCompleted()
    },

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
        const { currentFilter: oldFilter } = this.state;
        const oldCounter = this.counter.getCounter();

        this.state = {
            ...this.state,
            ...newState
        }

        const { currentFilter } = this.state;
        let items;

        if (this.taskFilters[currentFilter]) {
            items = this.state.tasks
                .filter(task => this.taskFilters[currentFilter](task));
        } else {
            items = this.state.tasks;
        }

        this.saveTaskToLocalStorage();
        this.list.changeProps(
            { items: items },
            oldFilter !== currentFilter || oldCounter !== items.length
        );
        this.counter.changeProps({ count: items.length });
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

            app.setState({
                tasks,
                currentFilter: app.filter.getCurrentFilter()
            });

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
        changeHandler: changeTaskHandler,
        deleteHandler: deleteTaskHandler
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
    app.setState({});
}

function deleteTaskHandler(taskObj) {
    app.setState({
        tasks: app.state.tasks.filter((t) => t !== taskObj)
    });
}

function changeFilterHandler(currentFilter) {
    app.setState({ currentFilter });
}
