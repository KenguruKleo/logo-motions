const generateSpec = params => {
    const {
        CANVAS_WIDTH = 2800,
        HEIGHT_START = 0,
        HEIGHT_FINISH = 350,
        LOGOS_COUNT = 43,
        RADIUS = 76,
        INITIAL_PADDING = 5,
        PADDING_INCREMENT = 2,
        MAX_PADDING = 50,
    } = params;

    const initBubbleSpecs = Array.apply(null, {length: LOGOS_COUNT})
        .map(Number.call, Number)
        .map(() => ({
            scale: [0.6, 0.8, 1][Math.floor(Math.random() * 3)],
        }));

    const getCandidate = initCircle => {
        const scale = initCircle.scale;
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

        if (initBubbles.length){
            return false;
        }
        return bubbleSpecs
    };

    let padding = INITIAL_PADDING;
    let bubbleSpecs = getBubbles({ initBubbleSpecs, padding });
    let protect = MAX_PADDING;

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

    if (!bubbleSpecs) {
        return false;
    }

    return {
        CANVAS_WIDTH,
        RADIUS,
        bubbleSpecs,
        padding,
        protect,
    }
};

const spec = spec => console.log(`found spec with padding: ${spec.padding}, left tries: ${spec.protect}`);

const getBestSpec = params => {
    let bestSpec = generateSpec(params);
    spec(bestSpec);

    for (let i = 0; i < 10000; i++) {
        const nextSpec = generateSpec({
            ...params,
            INITIAL_PADDING: bestSpec.padding,
        });
        if (!nextSpec) {
            continue;
        }
        if (nextSpec.padding > bestSpec.padding) {
            bestSpec = nextSpec;
            spec(bestSpec);
        } else if (nextSpec.padding === bestSpec.padding) {
            spec(bestSpec);
        }
    }

    return bestSpec;
};

module.exports = getBestSpec;
