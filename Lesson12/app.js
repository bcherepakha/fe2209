const app = {
    state: {
        tasks: []
    },
    addTaskForm: new AddTaskForm({
        selector: '.header',
        addTaskHandler: addTask
    }),
    list: new List({
        selector: '.todo-list'
    }),

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }
    }
}

console.log(app);

/** task
 * {
 *      id: number;
 *      text: string;
 *      complited: boolean;
 *  }
 */

function addTask(task) {
    const taskObj = new Task(task, {
        element: 'li'
    });
    const { tasks } = app.state; // tasks = app.state.tasks

    tasks.push(taskObj);

    app.setState({ tasks });
    app.list.changeProps({ items: tasks });
}
