const CANVAS_WIDTH = 2800;
const HEIGHT_START = 0;
const HEIGHT_FINISH = 350;
const LOGOS_COUNT = 43;
const RADIUS = 75;
const PADDING = 5;
const PADDING_INCREMENT = 2;

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

 export {
     CANVAS_WIDTH,
     RADIUS,
     bubbleSpecs,
 }
