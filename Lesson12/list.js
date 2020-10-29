function List(props) {
    this._props = props;
    this._listEl = document.querySelector(props.selector);

    this.clear();
    this.render();
}

List.prototype.clear = function () {
    this._listEl.innerText = '';
}

List.prototype.render = function () {
    if (this._props.items && this._props.items.length > 0) {
        this._listEl.append(
            ...this._props.items.map(function(item) {
                return item.render();
            })
        );
    }
}

List.prototype.changeProps = function (changedProps, clearList = false) {
    this._props = {
        ...this._props,
        ...changedProps
    }

    if (clearList) {
        this.clear();
    }

    this.render();
}
