import SimplexNoise from 'simplex-noise';
import {
    RADIUS,
    CANVAS_WIDTH,
    bubbleSpecs,
} from './spec';

import './assets/styles.scss';

const NOISE_SPEED = 0.004; // The frequency. Smaller for flat slopes, higher for jagged spikes.
const NOISE_AMOUNT = 5;    // The amplitude. The amount the noise affects the movement.
const SCROLL_SPEED = 0.3;

const bubblesEl = document.querySelector('.bubbles');

class Bubbles {
    constructor(specs) {
        this.bubbles = [];

        specs.forEach((spec, index) => {
            this.bubbles.push(new Bubble(index, spec));
        });

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
        this.noiseSeedX = Math.floor(Math.random() * 64000);
        this.noiseSeedY = Math.floor(Math.random() * 64000);
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

        const overlap = RADIUS * 2;
        if (this.x <  -overlap) {
            this.x = CANVAS_WIDTH;
        }

        this.el.style.transform = `translate(${this.xWithNoise}px, ${this.yWithNoise}px) scale(${this.scale})`;
    }
}

const bubbles = new Bubbles(bubbleSpecs);
