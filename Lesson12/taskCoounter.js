export default class TaskCounter {
    constructor(props) {
        this._props = props;
        this._el = document.querySelector(props.selector);

        this.render();
    }

    changeProps(newProps) {
        this._props = {
            ...this._props,
            ...newProps
        };

        this.render();
    }

    render() {
        this._el.innerText = +this._props.count || 0;
    }
}
