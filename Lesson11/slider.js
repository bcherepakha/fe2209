function Slider(selector, images, loop = true) {
    // this = {}
    // this.__proto__ = Slider.prototype

    this.selector = selector;
    this.rootEl = document.querySelector(selector);
    this.images = images;
    this.currentSlideIndex = 0;
    this.loop = loop;

    this.bodyEl = this.createBody();

    this.createControls();

    this.rootEl.append( this.bodyEl );
    this.rootEl.classList.add('slider');

    this.render();

    // return this;
}

// Slider.__proto__ === Function.prototype;
// Slider.prototype => {
//     constructor: Slider
//     __proto__: Object.prototype
// }

Slider.prototype.createControls = function () {
    const nextBtn = document.createElement('button');
    const prevBtn = document.createElement('button');
    // const self = this;
    const nextSlide = this.nextSlide.bind(this);

    nextBtn.innerText = 'next slide';
    prevBtn.innerText = 'prev slide';

    nextBtn.className = 'slider__control slider__control--next';
    prevBtn.classList.add('slider__control');
    prevBtn.classList.add('slider__control--prev');

    nextBtn.addEventListener(
        'click',
        // function () {
        //     this === nextBtn;
        //     self.nextSlide();
        // }
        nextSlide
    );

    prevBtn.addEventListener(
        'click',
        this.previosSlide.bind(this)
    )

    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;
    this.rootEl.append(nextBtn, prevBtn);
}

Slider.prototype.createBody = function () {
    const bodyEl = document.createElement('div');

    bodyEl.className = 'slider__body';

    // bodyEl.append(
    //     this.createSlideEl(this.currentSlideIndex)
    // );

    this.slidesCol = this.images.map(
        function(imgSrc, imgIdx) {
            return this.createSlideEl(imgIdx);
        },
        this
    );

    bodyEl.append.apply(bodyEl, this.slidesCol);

    return bodyEl;
}

Slider.prototype.createSlideEl = function (idx) {
    const slideEl = document.createElement('img');

    slideEl.className = 'slider__image';
    slideEl.src = this.images[idx];

    return slideEl;
}

Slider.prototype.previosSlide = function () {
    this.currentSlideIndex--;

    if (this.loop) {
        this.currentSlideIndex = (this.images.length + this.currentSlideIndex) % this.images.length;
    } else {
        this.currentSlideIndex = Math.max(this.currentSlideIndex, 0);
    }

    this.render();
}

Slider.prototype.nextSlide = function () {
    console.log(this);
    this.currentSlideIndex++;

    if (this.loop) {
        this.currentSlideIndex = this.currentSlideIndex % this.images.length;
    } else {
        this.currentSlideIndex = Math.min(this.currentSlideIndex, this.images.length - 1);
    }

    this.render();
}

Slider.prototype.render = function () {
    const currentSlideIndex = this.currentSlideIndex;

    // this.bodyEl.innerText = '';
    // this.bodyEl.append(
    //     this.createSlideEl(this.currentSlideIndex)
    // );
    this.slidesCol.forEach(
        function (imageEl, imageIdx) {
            if (imageIdx === currentSlideIndex) {
                imageEl.classList.add('slider__image--active');
            } else {
                imageEl.classList.remove('slider__image--active');
            }
        }
    );
}

const slider = new Slider(
    '.endedSlider',
    [
        'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1869&q=80',
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
    ],
    false
);

const loopSlider = new Slider(
    '.loopSlider',
    [
        'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1869&q=80',
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
    ]
)

console.log(slider);
console.log(loopSlider);

const testBtn = document.querySelector('.testBtn');

console.dir(testBtn);

// testBtn.onclick = function (e) {
//     slider.nextSlide();
// }

testBtn.addEventListener('click', function(e) {
    slider.nextSlide();
});
