class Timer {
    constructor() {
        this.currentTimeShift = 0;
        this.startPosition = null;
        this.createElement();
    }

    refresh() {
        this.currentTimeShift = 0;
        this.startPosition = null;
    }

    createElement() {
        this.rootEl = document.createElement('div');
        this.rootEl.classList.add('timer');
    }

    activate() {
        this.intervalId = setInterval(
            this.render.bind(this),
            1000
        );
    }

    deactivate() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    start() {
        if (!this.startPosition) {
            this.startPosition = Date.now();
            this.render();
            this.activate();
        }
    }

    pause() {
        this.currentTimeShift = this.getTime();
        this.startPosition = null;
        this.render();
        this.deactivate();
    }

    getTime() {
        if (!this.startPosition) {
            return this.currentTimeShift;
        }

        return this.currentTimeShift + Date.now() - this.startPosition;
    }

    getTimeAsString() {
        const time = Math.round(this.getTime() / 1000);
        const ss = time % 60;
        const mm = Math.floor(time / 60) % 60;
        const hh = Math.floor( time / 3600 );
        const result = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;

        if (hh) {
            return `${hh.toString().padStart(2, '0')}:${result}`;
        }

        return result;
    }

    render() {
        this.rootEl.innerText = this.getTimeAsString();
        return this.rootEl;
    }
}
