export class Modal {
    constructor(props = {}) {
        const { selector } = props;

        this.props = props;
        this.state = {
            hidden: true
        }

        if (selector) {
            this.findWindowOnPage();
        }

        if (!this.modalEl) {
            this.createWindow();
        }

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', this.hide.bind(this));

        if (this.props.closeOnOuterClick) {
            this.modalEl.addEventListener('click', this.outerClick.bind(this));
        }
    }

    outerClick(e) {
        const parentWindow = e.target.closest('.modal__window');

        if (!parentWindow) {
            this.hide();
        }
    }

    findWindowOnPage() {
        this.modalEl = document.querySelector(this.props.selector);

        if (this.modalEl) {
            this.closeBtn = this.modalEl.querySelector('.modal__close');
            this.titleEl = this.modalEl.querySelector('.modal__title');
            this.contentEl = this.modalEl.querySelector('.modal__content');
            this.actionsEl = this.modalEl.querySelector('.modal__actions');

            this.state.hidden = this.modalEl.classList.contains('modal--hidden');
        }
    }

    createWindow() {
        this.modalEl = document.createElement('div');

        this.modalEl.className = 'modal';

        const windowEl = document.createElement('div');

        windowEl.classList.add('modal__window');

        this.modalEl.append( windowEl );

        this.closeBtn = document.createElement('button');
        this.titleEl = document.createElement('div');
        this.contentEl = document.createElement('div');
        this.actionsEl = document.createElement('div');

        this.closeBtn.classList.add('modal__close');
        this.titleEl.classList.add('modal__title');
        this.contentEl.classList.add('modal__content');
        this.actionsEl.classList.add('modal__actions');

        windowEl.append(this.closeBtn, this.titleEl, this.contentEl, this.actionsEl);
    }

    changeProps(newProps) {
        this.props = {
            ...this.props,
            ...newProps
        }

        this.render();
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };

        this.render();
    }

    show() {
        this.setState({ hidden: false });
        document.body.append(this.modalEl);
    }

    hide() {
        this.setState({ hidden: true });
    }

    render() {
        if (this.state.hidden) {
            this.modalEl.classList.add('modal--hidden');
        } else {
            this.modalEl.classList.remove('modal--hidden');
        }

        if (this.props.title) {
            this.titleEl.hidden = false;
            this.titleEl.innerText = this.props.title;
        } else {
            this.titleEl.hidden = true;
        }

        if (this.props.content) {
            this.contentEl.hidden = false;
            this.contentEl.innerText = this.props.title;
        } else if (this.props.contentHTML) {
            this.contentEl.hidden = false;
            this.contentEl.innerText = '';
            this.contentEl.append(this.props.contentHTML);
        } else {
            this.contentEl.hidden = true;
        }
    }
}

// const clickBtn = document.querySelector('.click-me');
// const contentHTML = document.createElement('div');

// contentHTML.innerText = 'lorem ipsum';

// const modalWindow = new Modal({
//     closeOnOuterClick: true,
//     selector: '.modal',
//     title: 'Hi!',
//     contentHTML
// });

// console.log( modalWindow );

// modalWindow.show();
// modalWindow.hide();

// modalWindow.changeProps({
//     title: 'Hello!'
// });

// modalWindow.show();

// // clickBtn.addEventListener('click', modalWindow.show.bind(modalWindow));
// clickBtn.addEventListener('click', () => modalWindow.show());
