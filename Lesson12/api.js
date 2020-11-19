class API {
    constructor() {
        this._host = 'https://5d9969125641430014051850.mockapi.io/tasks';
    }

    getTasks() {
        return fetch(this._host)
            .then(response => response.json())
    }

    deleteTask(id) {
        return fetch(`${this._host}/${id}`, {
            method: 'DELETE'
        });
    }

    createTask(taskData) {
        return fetch(this._host, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
    }

    updateTask(taskData) {
        return fetch(`${this._host}/${taskData.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json());
        // url: `${this._host}/${taskData.id}`
        // method: 'PUT'
        // body + header: JSON
    }
}

export default new API();
