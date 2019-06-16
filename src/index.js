import SimplexNoise from 'simplex-noise';

import './assets/styles.scss';

const NOISE_SPEED = 0.004; // The frequency. Smaller for flat slopes, higher for jagged spikes.
const NOISE_AMOUNT = 5;    // The amplitude. The amount the noise affects the movement.
const SCROLL_SPEED = 0.3;
const CANVAS_WIDTH = 2800;
const HEIGHT_START = 0;
const HEIGHT_FINISH = 350;
const LOGOS_COUNT = 43;
const RADIUS = 75;
const PADDING = 5;
const PADDING_INCREMENT = 2;

const bubblesEl = document.querySelector('.bubbles');

const initBubbleSpecs = Array.apply(null, {length: LOGOS_COUNT})
    .map(Number.call, Number)
    .map(() => ({}));

const getCandidate = initCircle => {
    const scale = [0.6, 0.8, 1][Math.floor(Math.random() * 3)];
    const radius = RADIUS * scale;
    return {
        ...initCircle,
        x: Math.ceil(Math.random() * CANVAS_WIDTH),
        y: HEIGHT_START + Math.ceil(Math.random() * (HEIGHT_FINISH - HEIGHT_START)),
        r: radius,
        s: scale,
    };
};

const isOverlap = (bubbleSpecs, candidate, padding = 0) => {
    return bubbleSpecs.some(item => (
        Math.sqrt(Math.pow(item.x - candidate.x, 2) + Math.pow(item.y - candidate.y, 2)) <= item.r + candidate.r + padding
    ))
};

const getBubbles = ({ initBubbleSpecs, padding, protect = 10000 }) => {
    const bubbleSpecs = [];
    const initBubbles = [...initBubbleSpecs];

    while(initBubbles.length && protect > 0) {
        protect -= 1;
        const initCircle = initBubbles[0];

        const candidate = getCandidate(initCircle);

        if (bubbleSpecs.length === 0 || !isOverlap(bubbleSpecs, candidate, padding)) {
            bubbleSpecs.push(candidate);
            initBubbles.shift();
        }
    }
    console.log(padding, protect);

    if (initBubbles.length){
        return false;
    }
    return bubbleSpecs
};

let padding = PADDING;
let bubbleSpecs = getBubbles({ initBubbleSpecs, padding });
let protect = 30;
while(protect > 0) {
    protect -= 1;
    padding = padding + PADDING_INCREMENT;

    const newBubbleSpecs = getBubbles({ initBubbleSpecs, padding });

    if (newBubbleSpecs) {
        bubbleSpecs = newBubbleSpecs;
    } else {
        break;
    }
}

console.log(bubbleSpecs);

class Bubbles {
    constructor(specs) {
        this.bubbles = [];

        specs.forEach((spec, index) => {
            this.bubbles.push(new Bubble(index, spec));
        });
        //this.bubbles.push(new Bubble(0, specs[0]));

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
        this.scale = s;
        this.noiseSeedX = NOISE_SPEED;
        this.noiseSeedY = NOISE_SPEED;
        this.simplexX = new SimplexNoise();
        this.simplexY = new SimplexNoise();

        this.el = document.createElement("div");
        this.el.className = `bubble logo${this.index + 1}`;
        bubblesEl.appendChild(this.el);
    }

    update() {
        this.noiseSeedX += NOISE_SPEED;
        this.noiseSeedY += NOISE_SPEED;

        const randomX = this.simplexX.noise2D(this.noiseSeedX, 0);
        const randomY = this.simplexY.noise2D(this.noiseSeedY, 0);

        this.x -= SCROLL_SPEED;
        this.xWithNoise = this.x + (randomX * NOISE_AMOUNT);
        this.yWithNoise = this.y + (randomY * NOISE_AMOUNT);


        if (this.x <  -200) {
            this.x = CANVAS_WIDTH;
        }

        this.el.style.transform = `translate(${this.xWithNoise}px, ${this.yWithNoise}px) scale(${this.scale})`;
    }
}

const bubbles = new Bubbles(bubbleSpecs);
