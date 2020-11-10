export default class Filter {
    constructor(props) {
        this._props = props;
        this._items = Array.from(document.querySelectorAll(props.selector));
        this._avalableFilters = this._items.map(link => link.hash);
        this._currentFilter = location.hash;

        if (!this._currentFilter) {
            const selectedLink = this.getSelectedLink();

            if (selectedLink) {
                this._currentFilter = selectedLink.hash;
            } else {
                this._currentFilter = this._avalableFilters[0];
            }
        }

        this._items.forEach(link => link.addEventListener(
            'click',
            this.onChangeFilter.bind(this, link.hash)
        ))

        this.render();
    }

    getCurrentFilter() {
        return this._currentFilter;
    }

    getSelectedLink() {
        return this._items.find(link => link.classList.contains('selected'));
    }

    onChangeFilter(newFilter) {
        if (this._avalableFilters.includes(newFilter)) {
            this._currentFilter = newFilter;

            if (this._props.onChange) {
                this._props.onChange(this._currentFilter);
            }

            this.render();
        }
    }

    render() {
        this._items.forEach(link => {
            if (link.hash === this._currentFilter) {
                link.classList.add('selected');
            } else {
                link.classList.remove('selected');
            }
        })
    }
}
