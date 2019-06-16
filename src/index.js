import './assets/styles.scss';

const SCROLL_SPEED = 0.3;
const CANVAS_WIDTH = 2800;
const HEIGHT_START = 40;
const HEIGHT_FINISH = 400;
const LOGOS_COUNT = 20;

const bubblesEl = document.querySelector('.bubbles');

// const bubbleSpecs = Array.apply(null, {length: LOGOS_COUNT})
//     .map(Number.call, Number)
//     .map(() => ({
//         x: Math.ceil(Math.random() * CANVAS_WIDTH),
//         y: HEIGHT_START + Math.ceil(Math.random() * (HEIGHT_FINISH - HEIGHT_START))
//     }));
// console.log(bubbleSpecs);
const bubbleSpecs = [
    { s: .6, x: 1134, y: 45  },
    { s: .6, x: 1620, y: 271 },
    { s: .6, x: 1761, y: 372 },
    { s: .6, x: 2499, y: 79  },
    { s: .6, x: 2704, y: 334 },
    { s: .6, x: 2271, y: 356 },
    { s: .6, x: 795,  y: 226 },
    { s: .6, x: 276,  y: 256 },
    { s: .6, x: 1210, y: 365 },
    { s: .6, x: 444,  y: 193 },
    { s: .6, x: 2545, y: 387 },
    { s: .8, x: 1303, y: 193 },
    { s: .8, x: 907,  y: 88  },
    { s: .8, x: 633,  y: 320 },
    { s: .8, x: 323,  y: 60  },
    { s: .8, x: 129,  y: 357 },
    { s: .8, x: 1440, y: 342 },
    { s: .8, x: 1929, y: 293 },
    { s: .8, x: 2135, y: 198 },
    { s: .8, x: 2276, y: 82  },
    { s: .8, x: 2654, y: 182 },
    { s: .8, x: 2783, y: 60  },
    {        x: 1519, y: 118 },
    {        x: 1071, y: 233 },
    {        x: 1773, y: 148 },
    {        x: 2098, y: 385 },
    {        x: 2423, y: 244 },
    {        x: 901,  y: 385 },
    {        x: 624,  y: 111 },
    {        x: 75,   y: 103 },
    {        x: 413,  y: 367 },
    {        x: 2895, y: 271 },
    {        x: 1990, y: 75  }
];

class Bubbles {
    constructor(specs) {
        this.bubbles = [];

        specs.forEach((spec, index) => {
            this.bubbles.push(new Bubble(index, spec));
        })

        requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this.bubbles.forEach(bubble => bubble.update());
        this.raf = requestAnimationFrame(this.update.bind(this))
    }
}


class Bubble {
    constructor(index, {x, y, s = 1}) {
        this.index = index;
        this.x = x;
        this.y = y;
        //this.scale = s;

        this.el = document.createElement("div");
        this.el.className = `bubble logo${this.index + 1}`;
        bubblesEl.appendChild(this.el);
    }

    update() {
        this.x = (this.x <  -200) ? CANVAS_WIDTH : this.x - SCROLL_SPEED;
        //this.el.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

const bubbles = new Bubbles(bubbleSpecs);
