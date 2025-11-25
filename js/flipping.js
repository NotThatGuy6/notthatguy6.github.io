const pages = document.querySelectorAll('.page');
let current = 0;
let isFlipping = false;

function setZIndexesForFlip(flipIndex) {
    pages.forEach((page, i) => {
        if (i === flipIndex) {
            page.style.zIndex = pages.length + 1;
        } else if (page.classList.contains('flipped')) {
            page.style.zIndex = i + 1;
        } else {
            page.style.zIndex = pages.length - i;
        }
    });
}

function updateZIndexes() {
    pages.forEach((page, i) => {
        if (page.classList.contains('flipped')) {
            page.style.zIndex = i + 1;
        } else {
            page.style.zIndex = pages.length - i;
        }
    });
    isFlipping = false;
}

function flipForward(callback) {
    if (current < pages.length && !isFlipping) {
        isFlipping = true;
        setZIndexesForFlip(current);
        pages[current].classList.add('flipped');
        current++;
        setTimeout(() => {
            updateZIndexes();
            if (callback) callback();
        }, 1000);
    }
}

function flipBackward(callback) {
    if (current > 0 && !isFlipping) {
        isFlipping = true;
        current--;
        setZIndexesForFlip(current);
        pages[current].classList.remove('flipped');
        setTimeout(() => {
            updateZIndexes();
            if (callback) callback();
        }, 1000);
    }
}

function flipToTarget(target) {
    const step = target > current ? 1 : -1;
    const flipFn = step === 1 ? flipForward : flipBackward;

    function stepFlip() {
        if (current !== target) {
            flipFn(stepFlip);
        }
    }

    stepFlip();
}

document.getElementById('next').addEventListener('click', () => {
    flipForward();
});
document.getElementById('prev').addEventListener('click', () => {
    flipBackward();
});

document.querySelectorAll('.jump').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = parseInt(link.dataset.page);
        if (!isNaN(target) && target !== current) {
            flipToTarget(target);
        }
    });
});

updateZIndexes();