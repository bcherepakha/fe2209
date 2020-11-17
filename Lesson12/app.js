import Task from './task.js';
import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';
import TaskCounter from './taskCoounter.js';
import Filter from './filter.js';
import api from './api.js';

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
    api,
    loader: new ldLoader({ root: ".loader" }),

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

    async init() {
        if (!localStorage[this.storageKey]) {
            return ;
        }

        this.loader.on();
        // this.api.getTasks()
        //     .then(data => data.map(createTask))
        //     .then(tasks => {
        //         app.setState({
        //             tasks,
        //             currentFilter: app.filter.getCurrentFilter()
        //         });
        //     })
        //     .then(() => this.loader.off())
        //     .catch(error => console.log(error));

        try {
            const data = await this.api.getTasks();
            const tasks = data.map(createTask);
            app.setState({
                tasks,
                currentFilter: app.filter.getCurrentFilter()
            });
        } catch(error) {
            console.log(error);
        }

        this.loader.off();

        // try {
        //     const tasks = JSON.parse(localStorage[this.storageKey])
        //         .map((taskAsString) => {
        //             try {
        //                 return Task.parse(taskAsString);
        //             } catch (ex) {
        //                 return null;
        //             }
        //         })
        //         .filter(taskOrNull => !!taskOrNull)
        //         .map(task => {
        //             return createTask(task);
        //         });

        //     app.setState({
        //         tasks,
        //         currentFilter: app.filter.getCurrentFilter()
        //     });

        // } catch (ex) {
        //     return ;
        // }
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

async function addTask(task) {
    // app.api.createTask(task)
    //     .then(taskData => {});
    app.loader.on();
    try {
        const taskData = await app.api.createTask(task);
        const taskObj = createTask(taskData);
        const { tasks } = app.state; // tasks = app.state.tasks

        tasks.push(taskObj);

        app.setState({ tasks });

        app.loader.off();
        return { status: 'OK' };
    } catch (ex) {
        console.log(ex);

        app.loader.off();
        return { status: 'error', message: ex.message };
    }
}

function saveTaskToLocalStorage(key, value) {
    localStorage[key] = value;
}

function changeTaskHandler() {
    // TODO: update task
    app.setState({});
}

function deleteTaskHandler(taskObj) {
    app.loader.on();

    app.api.deleteTask(taskObj.getId())
        .then(response => response.json())
        .then(task => {
            if (task.id !== taskObj.getId()) {
                console.log('Error task deleted');
            }

            taskObj.remove();
            app.setState({
                tasks: app.state.tasks.filter((t) => t !== taskObj)
            });
        })
        .then(() => app.loader.off())
        .catch((error) => {
            console.log(error);
            // app.setState({});
            app.loader.off();
        });
}

function changeFilterHandler(currentFilter) {
    app.setState({ currentFilter });
}
